import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInstance } from '../../database/entities/authenticates/user-entity/user-entity';
import { getField } from '../../utils/get-field/get-field';
import env from '../../utils/env/env';
import { UserService } from './user.service';
import { omit } from 'lodash';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    const jwtService = new JwtService({
      secret: env['SECRET'],
    });
    service = new UserService(jwtService);
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  it('login', async () => {
    const result = await service.login({
      token: getField('user-http-entity').username,
      password: 'password',
    });
    expect(result.accessToken).not.toEqual(null);
  });

  it('login with remail', async () => {
    const result = await service.login({
      token: getField('user-http-entity').email,
      password: 'password',
    });
    expect(result.accessToken).not.toEqual(null);
  });

  it('Invalid Login', async () => {
    try {
      await service.login({ token: 'dqwdqw', password: 'password' });
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: 'Username or password inccorect',
      });
    }
  });

  it('Wrong password', async () => {
    try {
      await service.login({
        token: getField('user-http-entity').username,
        password: 'pdqdassword',
      });
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: 'Wrong password',
      });
    }
  });

  it('Login with email wrong password', async () => {
    try {
      await service.login({
        token: getField('user-http-entity').email,
        password: 'pdqdassword',
      });
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: 'Wrong password',
      });
    }
  });

  it('created', async () => {
    const result = await service.create({
      username: faker.internet.userName(),
      password: 'password',
      confirmation: 'password',
    });
    expect(omit(result, ['result'])).toEqual({
      status: HttpStatus.CREATED,
      message: 'Account has been created',
    });
  });

  it('created with email', async () => {
    const result = await service.create({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'password',
      confirmation: 'password',
    });
    expect(omit(result, ['result'])).toEqual({
      status: HttpStatus.CREATED,
      message: 'Account has been created',
    });
  });

  it('Username already exists', async () => {
    try {
      await service.create({
        username: getField('user-http-entity').username,
        password: 'password',
        confirmation: 'password',
      });
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: 'Username already exists, please choose another one',
      });
    }
  });

  it("Password don'\t match", async () => {
    try {
      await service.create({
        username: getField('user-http-entity').email,
        password: 'passdqwdword',
        confirmation: 'password',
      });
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: "Password don't match, please check again",
      });
    }
  });

  it('update', async () => {
    const { public_id, username } = getField(
      'user-http-entity',
    ) as UserInstance;
    const result = await service.update(
      public_id,
      {
        username,
        password: 'password',
      },
      {
        fieldname: 'file',
        originalname: '391282393_7054748857952078_2554999196306250130_n.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: '/Users/kenedy-/mvpapplication/mvpapplication/src/assets',
        filename: '6muLn08-89ryTPSsLe0Nc.jpeg',
        path: '/Users/kenedy-/mvpapplication/mvpapplication/src/assets/6muLn08-89ryTPSsLe0Nc.jpeg',
        size: 409192,
      } as Express.Multer.File,
    );
    expect(result).toEqual({
      status: HttpStatus.OK,
      message: 'Account has been updated',
    });
  });

  it('updated account not found', async () => {
    try {
      await service.update(
        'dqdqw',
        {
          username: 'dqwdq',
          password: 'password',
        },
        {} as any,
      );
    } catch (err) {
      expect(err.message).toEqual('false');
    }
  });

  it('updated account not found', async () => {
    try {
      const { public_id } = getField('user-service-entity') as UserInstance;
      await service.update(
        public_id,
        {
          username: 'dqwdq',
          password: 'passwdqdqord',
        },
        {} as any,
      );
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: 'Wrong password',
      });
    }
  });

  it('destroy', async () => {
    const { public_id } = getField('user-service-entity') as UserInstance;
    const result = await service.destroy(public_id);
    expect(result).toEqual({
      status: HttpStatus.OK,
      message: 'Account has been deleted',
    });
  });

  it('Failed destroy', async () => {
    try {
      await service.destroy('dqwdq');
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: 'Account not found',
      });
    }
  });
});
