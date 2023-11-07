import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import moment from 'moment';
import { BookingField } from '../../dto/booking-dto/booking-dto';
import { BookingRepository } from '../../repository/booking-repository/booking-repository';
import { BookingService } from '../../services/booking-service/booking-service';
import { environment } from '../../utils/environment/environment';
import { getfield } from '../../utils/get-field/get-field';
import supertest from 'supertest';
import { BookingController } from './booking-controller';
import { BookingEntity } from '../../database/entities/services/booking-entity/booking-entity';

describe('BookingController', () => {
  let user_id!: number;
  let id!: number;
  let booking!: BookingEntity;
  let destroy_id!: number;
  let token!: string;
  let app: INestApplication;

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
      controllers: [BookingController],
      providers: [BookingService, BookingRepository],
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
    id = getfield('booking-http-entity').id;
  } catch (err) {
    // empty
  }
  try {
    booking = getfield('booking-http-entity');
  } catch (err) {
    // empty
  }
  try {
    destroy_id = getfield('booking-entity').id;
  } catch (err) {
    // empty
  }
  try {
    user_id = getfield('user-http-entity').id;
  } catch (err) {
    // empty
  }

  it('http::booking create', async () => {
    await supertest(app.getHttpServer())
      .post('/booking')
      .set('content-type', 'application/json')
      .send({
        name: faker.person.fullName(),
        title: faker.lorem.paragraph(),
        desc: faker.lorem.paragraph(),
        date: new Date(),
        time: moment(new Date()).format('HH:mm:ss'),
      } as Partial<BookingField>)
      .expect(HttpStatus.CREATED)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.CREATED,
          message: 'Booking has been create',
        }),
      );
  });

  if (token) {
    it('http::booking create', async () => {
      await supertest(app.getHttpServer())
        .post('/booking')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: faker.person.fullName(),
          title: faker.lorem.paragraph(),
          desc: faker.lorem.paragraph(),
          date: new Date(),
          time: moment(new Date()).format('HH:mm:ss'),
          user_id,
        } as Partial<BookingField>)
        .expect(HttpStatus.CREATED)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.CREATED,
            message: 'Booking has been create',
          }),
        );
    });

    it('http::booking all', async () => {
      await supertest(app.getHttpServer())
        .get('/booking')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .query({ name: booking.name, type: 'string' })
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.length).not.toEqual(0));
    });
  }

  if (id) {
    it('http::booking detail', async () => {
      await supertest(app.getHttpServer())
        .get(`/booking/${id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.id).toEqual(id));
    });
  }

  if (destroy_id) {
    it('http::booking destroy', async () => {
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
        );
    });

    it('http::booking invalid destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/booking/000`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Booking not found',
          }),
        );
    });
  }
});
