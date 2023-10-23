import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userEntity } from '../../database/entities/authenticates/user-entity/user-entity';
import {
  LoginField,
  RegisterField,
} from '../../validators/user/user.validator';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { createpath, removepath } from '../../utils/system/system';
import env from '../../utils/env/env';
import { Op } from 'sequelize';
import { fileEntity } from '../../database/entities/commons/file-entity/file-entity';

@Injectable()
export class UserService {
  constructor(public jwtService: JwtService) {}

  private readonly regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  public async login(field: LoginField) {
    let where: { [key: string]: string } = { username: field.token };
    if (this.regex.test(field.token)) {
      where = { email: field.token };
      delete where['username'];
    }
    const findOne = await userEntity.findOne({ where });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Username or password inccorect',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const check = await bcrypt.compareSync(field.password, findOne.password);
    if (!check) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = this.jwtService.sign(
      { data: findOne },
      { secret: env['SECRET'] },
    );
    return { accessToken: token, status: HttpStatus.OK };
  }

  async create(field: RegisterField) {
    let where = [{ username: '' }, { email: '' }];
    if (field.username) {
      where = [...where, { username: field.username }];
    }
    if (field.email) {
      where = [...where, { email: field.email }];
    }

    const findOne = await userEntity.findOne({
      where: {
        [Op.or]: where,
      },
    });
    if (findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Username already exists, please choose another one',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (field.password !== field.confirmation) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: "Password don't match, please check again",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const file = await fileEntity.create({});
    file.save();
    const create = await userEntity.create(
      omit({ ...field, file_id: file.public_id }, ['confirmation']),
    );
    createpath(`../../database/dataTxt/${'user-service-entity.txt'}`, create);
    create.save();
    return {
      result: create,
      status: HttpStatus.CREATED,
      message: 'Account has been created',
    };
  }

  async update(
    public_id: string,
    field: { username: string; password: string },
    file: Express.Multer.File,
  ) {
    const findOne = await userEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException('false', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const check = await bcrypt.compareSync(field.password, findOne.password);
    if (!check) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: 'Wrong password' },
        HttpStatus.BAD_REQUEST,
      );
    }
    findOne.username = field.username;
    findOne.save();

    const fileEnt = await fileEntity.findOne({
      where: { public_id: findOne.file_id },
    });
    if (file?.originalname) {
      fileEnt.filename = file.filename;
      fileEnt.originalname = file.originalname;
      if (fileEnt.filepath) {
        try {
          removepath(`../..${fileEnt.filepath}`);
        } catch (err) {
          // empty
        }
      }
      fileEnt.filepath = file.path.split('/src')[1];
      fileEnt.type = file.mimetype.split('/')[0];
      fileEnt.save();
    }
    return { status: HttpStatus.OK, message: 'Account has been updated' };
  }

  async destroy(public_id: string) {
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
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Account has been deleted' };
  }
}
