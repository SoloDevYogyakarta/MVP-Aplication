import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getfield } from '../../utils/get-field/get-field';
import supertest from 'supertest';
import { environment } from '../../utils/environment/environment';
import { ServicesOrderController } from './order-controller';
import { OrderService } from '../../services/order-service/order-service';

describe('ServicesOrderController', () => {
  let public_id!: string;
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
      controllers: [ServicesOrderController],
      providers: [OrderService],
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
    public_id = getfield('order-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('http::order destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/services/order/${public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'Order has been delete',
          }),
        );
    });

    it('http::order invalid destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/services/order/dwqdqwd`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Order not found',
          }),
        );
    });
  }
});
