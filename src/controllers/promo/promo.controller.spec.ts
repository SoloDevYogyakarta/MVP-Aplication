import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { getField } from '../../utils/get-field/get-field';
import supertest from 'supertest';
import { ProductPromoRepository } from '../../repository/promo/promo.repository';
import env from '../../utils/env/env';
import { PromoController } from './promo.controller';
import { PromoField } from '../../validators/promo/promo.validator';
import { faker } from '@faker-js/faker';
import { ProductPromoService } from '../../services/promo/promo.service';

describe('PromoController', () => {
  let public_id!: string;
  let product_id!: string;
  let token!: string;
  let promo_id!: string;
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
      controllers: [PromoController],
      providers: [ProductPromoRepository, ProductPromoService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  it('should create the app', () => expect(app).toBeTruthy());

  try {
    product_id = getField('basic-http-entity').public_id;
    token = getField('token');
    public_id = getField('promo-entity').public_id;
    promo_id = getField('promo-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (product_id) {
    it('http::promo create', async () =>
      await supertest(app.getHttpServer())
        .post('/promo')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          main_stock: faker.number.int({ min: 1, max: 10 }),
          reverse_stock: faker.number.int({ min: 1, max: 10 }),
          value: faker.number.int({ min: 1, max: 100 }),
          start_time: new Date(),
          end_time: new Date(),
          product_id,
        } as Partial<PromoField>)
        .expect(HttpStatus.CREATED)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.CREATED,
            message: 'Promo has been create',
          }),
        ));

    it('http::promo invalid create', async () =>
      await supertest(app.getHttpServer())
        .post('/promo')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          main_stock: faker.number.int({ min: 1, max: 10 }),
          reverse_stock: faker.number.int({ min: 1, max: 10 }),
          value: faker.number.int({ min: 1, max: 100 }),
          start_time: new Date(),
          end_time: new Date(),
          product_id: 'dwqdqwd',
        } as Partial<PromoField>)
        .expect(HttpStatus.NOT_FOUND)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.NOT_FOUND,
            message: 'Product not found',
          }),
        ));

    it('http::promo invalid update', async () =>
      await supertest(app.getHttpServer())
        .post(`/promo/dqwdqwd`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.NOT_FOUND)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.NOT_FOUND,
            message: 'Promo not found',
          }),
        ));

    it('http::promo invalid destroy', async () =>
      await supertest(app.getHttpServer())
        .delete('/promo/dqdwq')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.NOT_FOUND)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.NOT_FOUND,
            message: 'Promo not found',
          }),
        ));

    it('http::promo get all', async () =>
      await supertest(app.getHttpServer())
        .get('/promo')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.length).not.toEqual(0)));
  }

  if (promo_id && public_id) {
    it('http::promo udpate', async () =>
      await supertest(app.getHttpServer())
        .post(`/promo/${promo_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          main_stock: faker.number.int({ min: 1, max: 10 }),
          reverse_stock: faker.number.int({ min: 1, max: 10 }),
          value: faker.number.int({ min: 1, max: 100 }),
          start_time: new Date(),
          end_time: new Date(),
        } as Partial<PromoField>)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Promo has been update',
          }),
        ));

    it('http::promo destroy', async () =>
      await supertest(app.getHttpServer())
        .delete(`/promo/${public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Promo has been delete',
          }),
        ));

    it('http::promo get detail', async () =>
      await supertest(app.getHttpServer())
        .get(`/promo/${promo_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.public_id).toEqual(promo_id)));
  }
});
