import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { environment } from '../../utils/environment/environment';
import { UserRepository } from '../../repository/user-repository/user-repository';
import { UserService } from '../../services/user-service/user-service';
import { UserController } from './user-controller';
import supertest from 'supertest';
import {
  ChangePasswordField,
  LoginField,
  RegisterField,
} from 'src/dto/user-dto/user-dto';
import { faker } from '@faker-js/faker';
import { UserInstance } from '../../database/entities/authenticate/user-entity/user-entity';
import { createpath } from '../../utils/system/system';
import { getfield } from '../../utils/get-field/get-field';
import { JwtStrategy } from '../../middleware/jwt-strategy/jwt-strategy';

describe('UserController', () => {
  let app: INestApplication;
  let token!: string;
  let user!: UserInstance;
  let destroy_id!: string;
  let single_destroy_id!: string;
  let admin!: UserInstance;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: environment['SECRET'],
          signOptions: {
            expiresIn: '7d',
          },
        }),
      ],
      controllers: [UserController],
      providers: [UserService, UserRepository, JwtStrategy],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  it('render correctly', () => expect(app.getHttpServer()).toMatchSnapshot());

  try {
    token = getfield('token');
  } catch (err) {
    // empty
  }
  try {
    user = getfield('user-http-entity');
  } catch (err) {
    // empty
  }
  try {
    admin = getfield('user-admin-entity');
  } catch (err) {
    // empty
  }
  try {
    single_destroy_id = getfield('user-entity').public_id;
  } catch (err) {
    // empty
  }
  try {
    destroy_id = getfield('user-history-destroy-entity').user_id;
  } catch (err) {
    // empty
  }

  it('http::user create', async () => {
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        plat_number: `BG ${Math.floor(1000 + Math.random() * 9999)} JAK`,
        phone_number: faker.phone.number(),
        name: faker.person.fullName(),
        motor: faker.commerce.productName(),
        year_production: Math.floor(1000 + Math.random() * 2023),
        address: faker.location.streetAddress(),
        password: 'password',
        confirmation: 'password',
      } as Partial<RegisterField>)
      .expect(HttpStatus.CREATED)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.CREATED,
          message: 'Account has been create',
        }),
      );
  });

  if (user?.public_id) {
    it('http::user create already exists', async () => {
      await supertest(app.getHttpServer())
        .post('/user')
        .set('content-type', 'application/json')
        .send({
          plat_number: user.plat_number,
          phone_number: faker.phone.number(),
          name: faker.person.fullName(),
          motor: faker.commerce.productName(),
          year_production: Math.floor(1000 + Math.random() * 2023),
          address: faker.location.streetAddress(),
          password: 'password',
          confirmation: 'password',
        } as Partial<RegisterField>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Plat number already exists',
          }),
        );
    });
  }

  it('http::user create already exists', async () => {
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        plat_number: admin.plat_number,
        phone_number: faker.phone.number(),
        name: faker.person.fullName(),
        motor: faker.commerce.productName(),
        year_production: Math.floor(1000 + Math.random() * 2023),
        address: faker.location.streetAddress(),
        password: 'password',
        confirmation: 'password',
      } as Partial<RegisterField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Plat number already exists',
        }),
      );
  });

  it("http::user create password don't match ", async () => {
    await supertest(app.getHttpServer())
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        plat_number: `BG ${Math.floor(1000 + Math.random() * 9999)} JAK`,
        phone_number: faker.phone.number(),
        name: faker.person.fullName(),
        motor: faker.commerce.productName(),
        year_production: Math.floor(1000 + Math.random() * 2023),
        address: faker.location.streetAddress(),
        password: 'password',
        confirmation: 'passwordqdqwd',
      } as Partial<RegisterField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: "Password don't match, please check again",
        }),
      );
  });

  if (admin?.public_id) {
    it('http::user login', async () => {
      await supertest(app.getHttpServer())
        .post('/user/login')
        .set('content-type', 'application/json')
        .send({
          token: admin.plat_number,
          password: 'password',
        } as Partial<LoginField>)
        .expect(HttpStatus.OK)
        .then((res) => {
          createpath('../folder-text/token.txt', res.body.access_token);
          expect(res.body.access_token).not.toEqual(null);
        });
    });
  }

  if (user?.public_id) {
    it('http::user login role member', async () => {
      await supertest(app.getHttpServer())
        .post('/user/login')
        .set('content-type', 'application/json')
        .send({
          token: user.plat_number,
          password: 'password',
        } as Partial<LoginField>)
        .expect(HttpStatus.OK)
        .then((res) => {
          createpath('../folder-text/token_member.txt', res.body.access_token);
          expect(res.body.access_token).not.toEqual(null);
        });
    });

    it('http::user invalid password login', async () => {
      await supertest(app.getHttpServer())
        .post('/user/login')
        .set('content-type', 'application/json')
        .send({
          token: user.plat_number,
          password: 'passwodqwdqrd',
        } as Partial<LoginField>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid username or password',
          }),
        );
    });
  }

  it('http::user invalid login', async () => {
    await supertest(app.getHttpServer())
      .post('/user/login')
      .set('content-type', 'application/json')
      .send({
        token: 'dqdqw',
        password: 'password',
      } as Partial<LoginField>)
      .expect(HttpStatus.BAD_REQUEST)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid username or password',
        }),
      );
  });

  if (token && user?.public_id) {
    it('http::user update', async () => {
      await supertest(app.getHttpServer())
        .post(`/user/update/${user.public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          plat_number: user.plat_number,
          phone_number: faker.phone.number(),
          name: faker.person.fullName(),
          address: faker.location.streetAddress(),
        } as Partial<RegisterField>)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Account has been update',
          }),
        );
    });

    it('http::user invalid update', async () => {
      await supertest(app.getHttpServer())
        .post(`/user/update/dqwdqwd`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          plat_number: user.plat_number,
          phone_number: faker.phone.number(),
          name: faker.person.fullName(),
          address: faker.location.streetAddress(),
        } as Partial<RegisterField>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Account not found',
          }),
        );
    });

    it('http::user update password', async () => {
      await supertest(app.getHttpServer())
        .post(`/user/update/password/${user.public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          plat_number: user.plat_number,
          old_password: 'password',
          password: 'password',
          confirmation: 'password',
        } as Partial<ChangePasswordField>)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Password has been update',
          }),
        );
    });

    it('http::user invalid update password', async () => {
      await supertest(app.getHttpServer())
        .post(`/user/update/password/dqwdqwd`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          plat_number: user.plat_number,
          old_password: 'password',
          password: 'password',
          confirmation: 'password',
        } as Partial<ChangePasswordField>)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'false',
          }),
        );
    });

    it('http::user update wrong password', async () => {
      await supertest(app.getHttpServer())
        .post(`/user/update/password/${user.public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          plat_number: user.plat_number,
          old_password: 'passwdqdqord',
          password: 'password',
          confirmation: 'password',
        } as Partial<ChangePasswordField>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Wrong password',
          }),
        );
    });

    it('http::user update password dont match', async () => {
      await supertest(app.getHttpServer())
        .post(`/user/update/password/${user.public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          plat_number: user.plat_number,
          old_password: 'password',
          password: 'password',
          confirmation: 'pasdqwdqsword',
        } as Partial<ChangePasswordField>)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: "Password don't match, please check again",
          }),
        );
    });

    it('http::user all', async () => {
      await supertest(app.getHttpServer())
        .get('/user')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body).not.toEqual(0));
    });

    it('http::user detail', async () => {
      await supertest(app.getHttpServer())
        .get(`/user/${user.public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.public_id).toEqual(user.public_id));
    });

    it('http::user detail unauthorization', async () => {
      await supertest(app.getHttpServer())
        .get(`/user/${user.public_id}`)
        .set('content-type', 'application/json')
        .expect(HttpStatus.UNAUTHORIZED)
        .then((res) =>
          expect(res.body).toEqual({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
          }),
        );
    });

    it('http::user me', async () => {
      await supertest(app.getHttpServer())
        .get('/user/current/user')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body).not.toEqual(null));
    });

    it('http::user destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/user/${single_destroy_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Account has been delete',
          }),
        );
    });

    it('http::user destroy with relationship', async () => {
      await supertest(app.getHttpServer())
        .delete(`/user/${destroy_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Account has been delete',
          }),
        );
    });

    it('http::user invalid destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/user/dqwdqdwq`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Account not found',
          }),
        );
    });
  }
});
