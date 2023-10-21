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
      providers: [ProductRepository, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

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

    it('http product destory', async () => {
      const { public_id } = getField('basic-entity');
      await supertest(app.getHttpServer())
        .delete(`/product/${public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${getField('token')}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body).toEqual('destroy'));
    });
  } catch (err) {
    // empty
  }
});
