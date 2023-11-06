import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getfield } from '../../utils/get-field/get-field';
import supertest from 'supertest';
import { PromoRepository } from '../../repository/promo-repository/promo-repository';
import { PromoService } from '../../services/promo-service/promo-service';
import { environment } from '../../utils/environment/environment';
import { PromoController } from './promo-controller';
import { PromoEntity } from '../../database/entities/services/promo-entity/promo-entity';
import { joinpath } from '../../utils/system/system';

describe('PromoController', () => {
  let user_id!: number;
  let promo: PromoEntity;
  let token!: string;
  let destroy_id!: number;
  let destroy_image_id!: number;
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
      controllers: [PromoController],
      providers: [PromoRepository, PromoService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  it('render correctly', () => expect(app.getHttpServer()).toMatchSnapshot());

  try {
    user_id = getfield('user-http-entity').id;
  } catch (err) {
    // empty
  }
  try {
    token = getfield('token');
  } catch (err) {
    // empty
  }
  try {
    promo = getfield('promo-http-entity');
  } catch (err) {
    // empty
  }
  try {
    destroy_id = getfield('promo-entity').id;
  } catch (err) {
    // empty
  }
  try {
    destroy_image_id = getfield('promo-destroy-image-entity').id;
  } catch (er) {
    // empty
  }

  if (user_id) {
    it('http::promo create', async () => {
      await supertest(app.getHttpServer())
        .post('/promo')
        .set('Authorization', `Bearer ${token}`)
        .field('name', faker.commerce.productName())
        .field('desc', faker.commerce.productDescription())
        .field('price', Number(faker.commerce.price()))
        .field('discount', faker.number.int({ min: 1, max: 100 }))
        .field('start_time', new Date().toISOString())
        .field('end_time', new Date().toISOString())
        .attach(
          'file',
          joinpath(
            '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
          ),
        )
        .expect(HttpStatus.CREATED)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.CREATED,
            message: 'Promo has been create',
          }),
        );
    });
  }

  if (promo) {
    it('http::promo create already exists', async () => {
      await supertest(app.getHttpServer())
        .post('/promo')
        .set('Authorization', `Bearer ${token}`)
        .field('name', promo.name)
        .field('desc', faker.commerce.productDescription())
        .field('price', Number(faker.commerce.price()))
        .field('discount', faker.number.int({ min: 1, max: 100 }))
        .field('start_time', new Date().toISOString())
        .field('end_time', new Date().toISOString())
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Promo name already exists',
          }),
        );
    });
    it('http::promo update', async () => {
      await supertest(app.getHttpServer())
        .post(`/promo/${promo.id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('name', faker.commerce.productName())
        .field('desc', faker.commerce.productDescription())
        .field('price', Number(faker.commerce.price()))
        .field('discount', faker.number.int({ min: 1, max: 100 }))
        .field('start_time', new Date().toISOString())
        .field('end_time', new Date().toISOString())
        .attach(
          'file',
          joinpath(
            '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
          ),
        )
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Promo has been update',
          }),
        );
    });

    it('http::promo invalid update', async () => {
      await supertest(app.getHttpServer())
        .post(`/promo/000`)
        .set('Authorization', `Bearer ${token}`)
        .field('name', faker.commerce.productName())
        .field('desc', faker.commerce.productDescription())
        .field('price', Number(faker.commerce.price()))
        .field('discount', faker.number.int({ min: 1, max: 100 }))
        .field('start_time', new Date().toISOString())
        .field('end_time', new Date().toISOString())
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Promo not found',
          }),
        );
    });

    it('http::promo all', async () => {
      await supertest(app.getHttpServer())
        .get('/promo')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.length).not.toEqual(0));
    });

    it('http::promo detail', async () => {
      await supertest(app.getHttpServer())
        .get(`/promo/${promo.id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.id).toEqual(promo.id));
    });
  }

  if (destroy_id) {
    it('http::promo invalid destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/promo/000`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Promo not found',
          }),
        );
    });

    it('http::promo destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/promo/${destroy_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Promo has been delete',
          }),
        );
    });

    it('http::promo destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/promo/${destroy_image_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Promo has been delete',
          }),
        );
    });
  }
});
