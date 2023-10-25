import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { BookingRepository } from '../../repository/booking/booking.repository';
import env from '../../utils/env/env';
import { getField } from '../../utils/get-field/get-field';
import supertest from 'supertest';
import { BookingController } from './booking.controller';
import { BookingService } from '../../services/booking/booking.service';
import { BookingField } from '../../validators/booking/booking.validator';

describe('BookingController', () => {
  let public_id!: string;
  let user_id!: string;
  let destroy_id!: string;
  let token!: string;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: env['SECRET'],
          signOptions: {
            expiresIn: '7d',
          },
        }),
      ],
      controllers: [BookingController],
      providers: [BookingRepository, BookingService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  it('should create the app', () => expect(app).toBeTruthy());

  try {
    token = getField('token');
    public_id = getField('booking-http-entity').public_id;
    user_id = getField('user-http-entity').email;
    destroy_id = getField('booking-entity').public_id;
  } catch (err) {}

  if (token) {
    it('http::booking create with anonymous', async () =>
      await supertest(app.getHttpServer())
        .post('/booking')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          token: faker.internet.userName(),
          day: new Date(),
          desc: faker.lorem.paragraph(),
        } as Partial<BookingField>)
        .expect(HttpStatus.CREATED)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.CREATED,
            message: 'Booking has been create',
          }),
        ));

    it('http::booking create with account', async () =>
      await supertest(app.getHttpServer())
        .post('/booking')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          token: user_id,
          day: new Date(),
          desc: faker.lorem.paragraph(),
        } as Partial<BookingField>)
        .expect(HttpStatus.CREATED)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.CREATED,
            message: 'Booking has been create',
          }),
        ));

    it('http::booking get all', async () =>
      await supertest(app.getHttpServer())
        .get('/booking')
        .query({ public_id })
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.length).not.toEqual(0)));

    if (public_id) {
      it('http::booking get detail', async () =>
        await supertest(app.getHttpServer())
          .get(`/booking/${public_id}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)
          .then((res) => expect(res.body.public_id).toEqual(public_id)));

      it('http::booking destroy', async () =>
        await supertest(app.getHttpServer())
          .delete(`/booking/${destroy_id}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)
          .then((res) =>
            expect(res.body).toEqual({
              status: HttpStatus.OK,
              message: 'Booking has been delete',
            }),
          ));

      it('http::booking invalid destroy', async () =>
        await supertest(app.getHttpServer())
          .delete(`/booking/dwqdqd`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.NOT_FOUND)
          .then((res) =>
            expect(res.body).toEqual({
              status: HttpStatus.NOT_FOUND,
              message: 'Booking not found',
            }),
          ));
    }
  }
});
