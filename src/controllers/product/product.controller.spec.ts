import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { ProductRepository } from '../../repository/product/product.repository';
import env from '../../utils/env/env';
import { getField } from '../../utils/get-field/get-field';
import supertest from 'supertest';
import { ProductController } from './product.controller';
import { ProductService } from '../../services/product/product.service';
import { faker } from '@faker-js/faker';
import { join } from 'path';
import { ProductStockEntity } from '../../database/entities/products/stock-entity/stock-entity';
import { ProductBasicEntity } from '../../database/entities/products/basic-entity/basic-entity';

describe('ProductController', () => {
  let token!: string;
  let public_id!: string;
  let destroy_id!: string;
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
      controllers: [ProductController],
      providers: [ProductRepository, ProductService, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  try {
    token = getField('token');
  } catch (err) {
    // empty
  }

  if (token) {
    it('http::product create', async () =>
      await supertest(app.getHttpServer())
        .post('/product')
        .set('Authorization', `Bearer ${token}`)
        .field('name', faker.commerce.productName())
        .field('status', faker.helpers.arrayElement([1, 2]))
        .field('condition', faker.helpers.arrayElement([-2, -1, 0, 1, 2]))
        .field('shortdesc', faker.lorem.paragraph())
        .field('main_stock', faker.helpers.arrayElement([1, 2]))
        .field('reserve_stock', faker.helpers.arrayElement([1, 2]))
        .field(
          'price',
          JSON.stringify({
            value: faker.number.int({ min: 100, max: 3000 }),
            currency: faker.number.int({ min: 100, max: 3000 }),
          } as Partial<ProductBasicEntity>),
        )
        .attach(
          'files',
          join(
            __dirname,
            '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
          ),
        )
        .attach(
          'files',
          join(
            __dirname,
            '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
          ),
        )
        .field(
          'stock',
          JSON.stringify({
            use_stock: faker.datatype.boolean(),
            value: faker.number.int({ min: 10, max: 20 }),
            stock_wording: faker.number.int({ min: 1, max: 15 }),
          } as Partial<ProductStockEntity>),
        )
        .expect(HttpStatus.CREATED)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.CREATED,
            message: 'Product has been create',
          }),
        ));

    try {
      public_id = getField('basic-http-entity').public_id;
      destroy_id = getField('basic-entity').public_id;
    } catch (err) {
      // empty
    }

    if (public_id && destroy_id) {
      it('http::product update', async () =>
        await supertest(app.getHttpServer())
          .post(`/product/${public_id}`)
          .set('Authorization', `Bearer ${token}`)
          .field('name', faker.commerce.productName())
          .field('status', faker.helpers.arrayElement([1, 2]))
          .field('condition', faker.helpers.arrayElement([-2, -1, 0, 1, 2]))
          .field('shortdesc', faker.lorem.paragraph())
          .field('main_stock', faker.helpers.arrayElement([1, 2]))
          .field('reserve_stock', faker.helpers.arrayElement([1, 2]))
          .field(
            'price',
            JSON.stringify({
              value: faker.number.int({ min: 100, max: 3000 }),
              currency: faker.number.int({ min: 100, max: 3000 }),
            } as Partial<ProductBasicEntity>),
          )
          .attach(
            'files',
            join(
              __dirname,
              '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
            ),
          )
          .attach(
            'files',
            join(
              __dirname,
              '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
            ),
          )
          .field(
            'stock',
            JSON.stringify({
              use_stock: faker.datatype.boolean(),
              value: faker.number.int({ min: 10, max: 20 }),
              stock_wording: faker.number.int({ min: 1, max: 15 }),
            } as Partial<ProductStockEntity>),
          )
          .expect(HttpStatus.OK)
          .then((res) =>
            expect(res.body).toEqual({
              status: HttpStatus.OK,
              message: 'Product has been update',
            }),
          ));

      it('http::product invalid update', async () =>
        await supertest(app.getHttpServer())
          .post(`/product/dqwdqwd`)
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.NOT_FOUND)
          .then((res) =>
            expect({ status: res.status, message: res.body.message }).toEqual({
              status: HttpStatus.NOT_FOUND,
              message: 'Not Found',
            }),
          ));

      it('http::product destroy', async () =>
        await supertest(app.getHttpServer())
          .delete(`/product/${destroy_id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)
          .then((res) =>
            expect(res.body).toEqual({
              status: HttpStatus.OK,
              message: 'Product has been delete',
            }),
          ));

      it('http::product invalid destroy', async () =>
        await supertest(app.getHttpServer())
          .delete('/product/dqwdqw')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.NOT_FOUND)
          .then((res) =>
            expect({ status: res.status, message: res.body.message }).toEqual({
              status: HttpStatus.NOT_FOUND,
              message: 'Not Found',
            }),
          ));

      it('http::product detail', async () =>
        await supertest(app.getHttpServer())
          .get(`/product/${public_id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)
          .then((res) => expect(res.body.public_id).toEqual(public_id)));

      it('http::product all', async () =>
        await supertest(app.getHttpServer())
          .get('/product')
          .set('Authorization', `Bearer ${token}`)
          .query({
            public_id,
          })
          .expect(HttpStatus.OK)
          .then((res) => expect(res.body.length).not.toEqual(0)));
    }
  }
});
