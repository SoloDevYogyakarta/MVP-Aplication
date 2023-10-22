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

const type = ['Tuner Up', 'Over Haul'];
const bulkInsert = [
  { name: 'KM', type: '80000', desc: '16000' },
  { name: 'Part replacement', type: 'Merek', desc: 'Catatan' },
  { name: 'Oli', type: 'Motul', desc: '1L' },
  { name: 'Belt', type: 'Gates', desc: '1' },
  { name: 'filter Oli', type: 'Sakura', desc: 'Bawa Sendiri' },
  { name: 'Roller ', type: 'Dr.Pulley', desc: '11gr' },
  { name: '11gr', type: 'N/A', desc: '5pcs' },
  { name: 'oli gearbox', type: 'Valvoline', desc: '120ml' },
  { name: 'rantai', type: 'sss', desc: 'bawa sendiri' },
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

  it('http create new product', async () =>
    await supertest(app.getHttpServer())
      .post('/product')
      .set('Authorization', `Bearer ${getField('token')}`)
      .field('type', type[faker.helpers.arrayElement([0, 1])])
      .field('date', new Date().toDateString())
      .field('mechanis_name', faker.person.fullName())
      .field('desc', faker.lorem.paragraph())
      .field('variants', JSON.stringify(bulkInsert))
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
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.CREATED,
          message: 'Product has been create',
        }),
      ));

  it('http update product', async () =>
    await supertest(app.getHttpServer())
      .post(`/product/${getField('basic-entity').public_id}`)
      .set('Authorization', `Bearer ${getField('token')}`)
      .field('type', type[faker.helpers.arrayElement([0, 1])])
      .field('date', new Date().toDateString())
      .field('mechanis_name', faker.person.fullName())
      .field('desc', `update-${faker.lorem.paragraph()}`)
      .field(
        'variants',
        JSON.stringify(
          bulkInsert.map((item) => ({
            ...item,
            public_id: getField('variant-entity').public_id,
          })),
        ),
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
      .then((res) =>
        expect(res.body).toEqual({
          status: HttpStatus.OK,
          message: 'Product has been update',
        }),
      ));

  it('http product all', async () =>
    await supertest(app.getHttpServer())
      .get('/product')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) => {
        createpath(
          '../../database/dataTxt/product-http-entity.txt',
          res.body[0],
        );
        expect(res.body.length).not.toEqual(0);
      }));

  try {
    it('http product detail', async () => {
      const { public_id } = getField('product-http-entity');
      await supertest(app.getHttpServer())
        .get(`/product/${public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${getField('token')}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.public_id).toEqual(public_id));
    });

    it('http product destroy', async () => {
      const { public_id } = getField('basic-entity');
      await supertest(app.getHttpServer())
        .delete(`/product/${public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${getField('token')}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Product has been delete',
          }),
        );
    });
  } catch (err) {
    // empty
  }
});
