import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { ProductRepository } from '../../repository/product/product.repository';
import env from '../../utils/env/env';
import { getField } from '../../utils/get-field/get-field';
import { createpath } from '../../utils/system/system';
import supertest from 'supertest';
import { ProductController } from './product.controller';
import { ProductService } from '../../services/product/product.service';
import { faker } from '@faker-js/faker';
import { join } from 'path';
import { ProductStockEntity } from '../../database/entities/products/stock-entity/stock-entity';
import { ProductBasicEntity } from '../../database/entities/products/basic-entity/basic-entity';

const type = ['Tuner Up', 'Over Haul'];
const bulkInsert = [
  { name: 'KM', type: '80000', desc: '16000', price: 500 },
  { name: 'Part replacement', type: 'Merek', desc: 'Catatan', price: 222000 },
  { name: 'Oli', type: 'Motul', desc: '1L', price: 20000 },
  { name: 'Belt', type: 'Gates', desc: '1', price: 293000 },
  { name: 'filter Oli', type: 'Sakura', desc: 'Bawa Sendiri', price: 0 },
  { name: 'Roller ', type: 'Dr.Pulley', desc: '11gr', price: 22000 },
  { name: '11gr', type: 'N/A', desc: '5pcs', price: 92000 },
  { name: 'oli gearbox', type: 'Valvoline', desc: '120ml', price: 200 },
  { name: 'rantai', type: 'sss', desc: 'bawa sendiri', price: 100 },
];

describe('ProductController', () => {
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

  it('http::product create', async () =>
    await supertest(app.getHttpServer())
      .post('/product')
      .set('Authorization', `Bearer ${getField('token')}`)
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

  it('http::product update', async () =>
    await supertest(app.getHttpServer())
      .post(`/product/${getField('basic-http-entity').public_id}`)
      .set('Authorization', `Bearer ${getField('token')}`)
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

  it('http::product destroy', async () =>
    await supertest(app.getHttpServer())
      .delete(`/product/${getField('basic-entity').public_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.OK,
          message: 'Product has been delete',
        }),
      ));

  it('http::product all', async () =>
    await supertest(app.getHttpServer())
      .get('/product')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) => expect(res.body.length).not.toEqual(0)));

  it('http::product detail', async () => {
    const { public_id } = getField('basic-http-entity');
    await supertest(app.getHttpServer())
      .get(`/product/${public_id}`)
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) => expect(res.body.public_id).toEqual(public_id));
  });
});
