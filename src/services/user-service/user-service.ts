import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { userEntity } from '../../database/entities/authenticate/user-entity/user-entity';
import {
  ChangePasswordField,
  LoginField,
  RegisterField,
} from '../../dto/user-dto/user-dto';
import { environment } from '../../utils/environment/environment';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly jwtService: JwtService) {}

  async login(body: LoginField) {
    this.logger.log(UserService.name);
    const findOne = await userEntity.findOne({
      where: { plat_number: body.token },
    });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid username or password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const check = await bcrypt.compareSync(body.password, findOne.password);
    if (!check) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid username or password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const access_token = this.jwtService.sign(
      {
        data: JSON.parse(JSON.stringify(findOne)),
      },
      { secret: environment['SECRET'] },
    );
    return { status: HttpStatus.OK, access_token };
  }

  async create(body: RegisterField) {
    this.logger.log(UserService.name);
    const findOne = await userEntity.findOne({
      where: { plat_number: body.plat_number },
    });
    if (findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Plat number already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (body.password !== body.confirmation) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: "Password don't match, please check again",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const create = await userEntity.create(
      omit({ ...body, password: await bcrypt.hashSync(body.password, 15) }, [
        'confirmation',
      ]),
    );
    create.save();
    return {
      status: HttpStatus.CREATED,
      message: 'Account has been create',
      result: create,
    };
  }

  async update(public_id: string, body: RegisterField) {
    const findOne = await userEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Account not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    findOne.update(
      omit(body, ['motor', 'year_production', 'password', 'confirmation']),
      { where: { public_id } },
    );
    return { status: HttpStatus.OK, message: 'Account has been update' };
  }

  async changePassword(public_id: string, body: ChangePasswordField) {
    const findOne = await userEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'false',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const check = await bcrypt.compareSync(body.old_password, findOne.password);
    if (!check) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (body.password !== body.confirmation) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: "Password don't match, please check again",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    findOne.password = await bcrypt.hashSync(body.password, 15);
    findOne.save();
    return { status: HttpStatus.OK, message: 'Password has been update' };
  }
}
