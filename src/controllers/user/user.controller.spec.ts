import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserService } from '../../services/user/user.service';
import { UserRepository } from '../../repository/user/user.repository';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import supertest from 'supertest';
import {
  LoginField,
  RegisterField,
} from '../../validators/user/user.validator';
import env from '../../utils/env/env';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../middleware/local.strategy';
import { JwtStrategy } from '../../middleware/jwt.strategy';
import { createpath } from '../../utils/system/system';
import { faker } from '@faker-js/faker';
import { getField } from '../../utils/get-field/get-field';
import { UserInstance } from '../../database/entities/authenticates/user-entity/user-entity';
import { join } from 'path';

describe('UserController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: env['SECRET'] || 'token',
          signOptions: { expiresIn: '7d' },
        }),
      ],
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository,
        JwtService,
        LocalStrategy,
        JwtStrategy,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  it('http get me', async () =>
    await supertest(app.getHttpServer())
      .get('/user/access/me')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) => expect(res.body.public_id).not.toEqual(null)));

  it('http user login', async () =>
    await supertest(app.getHttpServer())
      .post('/user/login')
      .set('content-type', 'application/json')
      .send({
        token: getField('user-http-entity')?.username,
        password: 'password',
      } as Partial<LoginField>)
      .expect(HttpStatus.OK)
      .then((res) => {
        createpath('../../database/dataTxt/token.txt', res.body.accessToken);
        expect(res.body.accessToken).not.toEqual(null);
      }));

  it('http user login with email', async () =>
    await supertest(app.getHttpServer())
      .post('/user/login')
      .set('content-type', 'application/json')
      .send({
        token: getField('user-http-entity')?.email,
        password: 'password',
      } as Partial<LoginField>)
      .expect(HttpStatus.OK)
      .then((res) => {
        createpath('../../database/dataTxt/token.txt', res.body.accessToken);
        expect(res.body.accessToken).not.toEqual(null);
      }));

  it('http user login invalid username', async () =>
    await supertest(app.getHttpServer())
      .post('/user/login')
      .set('content-type', 'application/json')
      .send({
        token: 'Randi.Jdqwdast',
        password: 'password',
      } as Partial<LoginField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Username or password inccorect',
        });
      }));

  it('http user login invalid email', async () =>
    await supertest(app.getHttpServer())
      .post('/user/login')
      .set('content-type', 'application/json')
      .send({
        token: 'Randi@yahoo.com',
        password: 'password',
      } as Partial<LoginField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Username or password inccorect',
        });
      }));

  it('http user login with username invalid password', async () =>
    await supertest(app.getHttpServer())
      .post('/user/login')
      .set('content-type', 'application/json')
      .send({
        token: getField('user-http-entity').username,
        password: 'passdqdqwword',
      } as Partial<LoginField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong password',
        });
      }));

  it('http user login with email invalid password', async () =>
    await supertest(app.getHttpServer())
      .post('/user/login')
      .set('content-type', 'application/json')
      .send({
        token: getField('user-http-entity').email,
        password: 'passdqdqwword',
      } as Partial<LoginField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong password',
        });
      }));

  it('http user reset password', async () =>
    await supertest(app.getHttpServer())
      .post('/user/reset/password')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .then((res) => {
        expect(res.body).toEqual('reset');
      }));

  it('http user created', async () => {
    const data = {
      username: faker.internet.userName(),
      password: 'password',
      confirmation: 'password',
      http: true,
    } as Partial<RegisterField>;
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send(data)
      .expect(HttpStatus.CREATED)
      .then((res) => {
        expect(res.body).toEqual({
          status: HttpStatus.CREATED,
          message: 'Account has been created',
        });
      });
  });

  it('http user created with email', async () => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'password',
      confirmation: 'password',
      http: true,
    } as Partial<RegisterField>;
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send(data)
      .expect(HttpStatus.CREATED)
      .then((res) => {
        expect(res.body).toEqual({
          status: HttpStatus.CREATED,
          message: 'Account has been created',
        });
      });
  });

  it('http user created || username already exists', async () => {
    const data = {
      username: 'Randi.Jast',
      email: `invalid-${faker.internet.email()}`,
      password: 'password',
      confirmation: 'password',
      http: true,
    } as Partial<RegisterField>;
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send(data)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Username already exists, please choose another one',
        });
      });
  });

  it('http user created || email already exists', async () => {
    const data = {
      username: faker.internet.userName(),
      email: getField('user-http-entity')?.email,
      password: 'password',
      confirmation: 'password',
      http: true,
    } as Partial<RegisterField>;
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send(data)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Username already exists, please choose another one',
        });
      });
  });

  it("http user created || Password don't match", async () => {
    const data = {
      username: faker.internet.userName(),
      password: 'passwodqdqwrd',
      confirmation: 'password',
      http: true,
    } as Partial<RegisterField>;
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send(data)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: "Password don't match, please check again",
        });
      });
  });

  it('http user updated', async () => {
    const { username, public_id } = getField('user-http-entity');
    await supertest(app.getHttpServer())
      .post(`/user/${public_id}`)
      .set('Authorization', `Bearer ${getField('token')}`)
      .field('username', username)
      .field('password', 'password')
      .attach(
        'file',
        join(
          __dirname,
          '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
        ),
      )
      .expect(HttpStatus.OK)
      .then((res) => {
        expect(res.body).toEqual({
          status: HttpStatus.OK,
          message: 'Account has been updated',
        });
      });
  });

  it('http user updated invalid id', async () => {
    const { username } = getField('user-http-entity');
    await supertest(app.getHttpServer())
      .post(`/user/dqwdqdqw`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .field('username', faker.internet.userName())
      .field('password', 'password')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'false',
        });
      });
  });

  it('http user updated invalid password', async () => {
    const { public_id } = getField('user-http-entity');
    await supertest(app.getHttpServer())
      .post(`/user/${public_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .field('username', faker.internet.userName())
      .field('password', 'dqwkdmqkwdq')
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong password',
        });
      });
  });

  it('http user list', async () =>
    await supertest(app.getHttpServer())
      .get('/user')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) => expect(res.body.length).not.toEqual(0)));

  it('http user detail', async () =>
    await supertest(app.getHttpServer())
      .get(`/user/${(getField('user-http-entity') as UserInstance).public_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) =>
        expect(res.body.public_id).toEqual(
          (getField('user-http-entity') as UserInstance).public_id,
        ),
      ));

  it('http user detail Invalid', async () =>
    await supertest(app.getHttpServer())
      .get(`/user/dqwdqwdqw`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) => {
        expect(res.body).toEqual(null);
      }));

  it('http user destroy', async () => {
    const { public_id } = getField('user-entity');
    await supertest(app.getHttpServer())
      .delete(`/user/${public_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) => {
        expect(res.body).toEqual({
          status: HttpStatus.OK,
          message: 'Account has been deleted',
        });
      });
  });

  it('http user destroy Invalid', async () =>
    await supertest(app.getHttpServer())
      .delete(`/user/dwqdq`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) => {
        const error = res.error as {
          text: string;
        };
        expect(JSON.parse(error.text)).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Account not found',
        });
      }));
});
