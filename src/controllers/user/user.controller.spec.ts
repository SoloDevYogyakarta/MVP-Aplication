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
  ResetField,
} from '../../validators/user/user.validator';
import env from '../../utils/env/env';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../middleware/local.strategy';
import { JwtStrategy } from '../../middleware/jwt.strategy';
import { faker } from '@faker-js/faker';
import { getField } from '../../utils/get-field/get-field';
import {
  userEntity,
  UserEntity,
} from '../../database/entities/authenticates/user-entity/user-entity';
import { join } from 'path';
import { pick } from 'lodash';

const findOne = userEntity.findOne({ where: { id: 1, role: 'admin' } });

describe('UserController', () => {
  let public_id!: string;
  let destory_id!: string;
  let username!: string;
  let email!: string;
  let token!: string;
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

  it('http::user create', async () =>
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        username: faker.internet.userName(),
        password: 'password',
        confirmation: 'password',
      } as Partial<RegisterField>)
      .expect(HttpStatus.CREATED)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.CREATED,
          message: 'Account has been created',
        }),
      ));

  it('http::user create with email', async () =>
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'password',
        confirmation: 'password',
      } as Partial<RegisterField>)
      .expect(HttpStatus.CREATED)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.CREATED,
          message: 'Account has been created',
        }),
      ));

  it('http::user create, username already exists', async () =>
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        username: getField('user-http-entity').username,
        password: 'password',
        confirmation: 'password',
      } as Partial<RegisterField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Username already exists, please choose another one',
        }),
      ));

  it('http::user create, email already exists', async () =>
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        email: getField('user-http-entity').email,
        password: 'password',
        confirmation: 'password',
      } as Partial<RegisterField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Email address already exists, please choose another one',
        }),
      ));

  it('http::user create, username or email already exists', async () =>
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        ...pick(getField('user-http-entity'), ['username', 'email']),
        password: 'password',
        confirmation: 'password',
      } as Partial<RegisterField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message:
            'Username or Email address already exists, please choose another one',
        }),
      ));

  it("http::user password don't match", async () =>
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'passwordqdqwd',
        confirmation: 'password',
      } as Partial<RegisterField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: "Password don't match, please check again",
        }),
      ));

  try {
    public_id = getField('user-http-entity').public_id;
    destory_id = getField('user-entity').public_id;
    username = getField('user-http-entity').username;
    email = getField('user-http-entity').email;
  } catch (err) {
    // empty
  }

  if (username && email) {
    it('http::user login with username', async () =>
      await supertest(app.getHttpServer())
        .post('/user/login')
        .set('content-type', 'application/json')
        .send({
          token: (await findOne).username,
          password: 'password',
        } as Partial<LoginField>)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.accessToken).not.toEqual(null)));

    it('http::user login with email', async () =>
      await supertest(app.getHttpServer())
        .post('/user/login')
        .set('content-type', 'application/json')
        .send({
          token: (await findOne).email,
          password: 'password',
        } as Partial<LoginField>)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.accessToken).not.toEqual(null)));

    it('http::user login invalid username', async () =>
      await supertest(app.getHttpServer())
        .post('/user/login')
        .set('content-type', 'application/json')
        .send({
          token: 'doqdqw',
          password: 'password',
        } as Partial<LoginField>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Username or password inccorect',
          }),
        ));

    it('http::user login invalid email', async () =>
      await supertest(app.getHttpServer())
        .post('/user/login')
        .set('content-type', 'application/json')
        .send({
          token: 'email@yahoo.com',
          password: 'password',
        } as Partial<LoginField>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Username or password inccorect',
          }),
        ));

    it('http::user login invalid password', async () =>
      await supertest(app.getHttpServer())
        .post('/user/login')
        .send({
          token: username,
          password: 'dqwdqwd',
        } as Partial<LoginField>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Wrong password',
          }),
        ));
  }

  try {
    token = getField('token');
  } catch (err) {
    // empty
  }

  if (token) {
    it('http::user update', async () =>
      await supertest(app.getHttpServer())
        .post(`/user/${public_id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('username', faker.internet.userName())
        .field('password', 'password')
        .attach(
          'file',
          join(
            __dirname,
            '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
          ),
        )
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Account has been updated',
          }),
        ));

    it('http::user update role', async () => {
      const role = faker.helpers.arrayElement([0, 1]) ? 'admin' : 'member';
      await supertest(app.getHttpServer())
        .post('/user/update/role')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ public_id, role })
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: `Role ${role} has been updated`,
          }),
        );
    });

    it('http::user invalid update role', async () =>
      await supertest(app.getHttpServer())
        .post('/user/update/role')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ public_id: 'dwqdqw', role: 'dqwdq' })
        .expect(HttpStatus.NOT_FOUND)
        .then((res) =>
          expect({ status: res.status, message: res.body.message }).toEqual({
            status: HttpStatus.NOT_FOUND,
            message: 'Not Found',
          }),
        ));

    it('http::user update invalid password', async () =>
      await supertest(app.getHttpServer())
        .post(`/user/${public_id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('username', faker.internet.userName())
        .field('password', 'pdqwassword')
        .attach(
          'file',
          join(
            __dirname,
            '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
          ),
        )
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Wrong password',
          }),
        ));

    it('http::user destroy', async () =>
      await supertest(app.getHttpServer())
        .delete(`/user/${destory_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Account has been deleted',
          }),
        ));

    it('http::user list', async () =>
      await supertest(app.getHttpServer())
        .get('/user')
        .query({
          username: 'a',
        } as UserEntity)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.length).not.toEqual(0)));

    it('http::user detail', async () =>
      await supertest(app.getHttpServer())
        .get(`/user/${public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.public_id).toEqual(public_id)));

    it('http::user me', async () =>
      await supertest(app.getHttpServer())
        .get('/user/access/me')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.public_id).not.toEqual(null)));

    it('http::user reset', async () =>
      await supertest(app.getHttpServer())
        .post('/user/reset/password')
        .set('content-type', 'application/json')
        .send({
          email: faker.internet.email(),
        } as Partial<ResetField>)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body).toEqual('reset')));
  }
});
