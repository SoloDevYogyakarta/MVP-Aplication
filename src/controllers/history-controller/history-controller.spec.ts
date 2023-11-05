import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getfield } from '../../utils/get-field/get-field';
import { HistoryRepository } from '../../repository/history-repository/history-repository';
import { HistoryService } from '../../services/history-service/history-service';
import { environment } from '../../utils/environment/environment';
import { ServiceHistoryController } from './history-controller';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { createpath, joinpath } from '../../utils/system/system';

describe('ServiceHistoryController', () => {
  let destory_id!: number;
  let user_id!: number;
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
      controllers: [ServiceHistoryController],
      providers: [HistoryService, HistoryRepository],
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
    user_id = getfield('user-http-entity').id;
  } catch (err) {
    // empty
  }
  try {
    destory_id = getfield('history-entity').id;
  } catch (err) {
    // empty
  }

  if (user_id && token) {
    it('http::history create', async () => {
      await supertest(app.getHttpServer())
        .post(`/services/history/${user_id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('desc', faker.lorem.paragraph())
        .field(
          'data',
          JSON.stringify([
            {
              name: faker.commerce.productName(),
              title: faker.commerce.productMaterial(),
              desc: faker.commerce.productDescription(),
              price: faker.number.int({ min: 1000, max: 20000 }),
            },
          ]),
        )
        .attach(
          'file',
          joinpath(
            '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
          ),
        )
        .attach(
          'file',
          joinpath(
            '../../../391282393_7054748857952078_2554999196306250130_n.jpg',
          ),
        )
        .expect(HttpStatus.CREATED)
        .then((res) => {
          expect(res.body).toEqual({
            status: HttpStatus.CREATED,
            message: 'History has been added',
          });
        });
    });

    it('http::history invalid create', async () => {
      await supertest(app.getHttpServer())
        .post(`/services/history/dqwdqwdq`)
        .set('Authorization', `Bearer ${token}`)
        .field(
          'data',
          JSON.stringify([
            {
              name: faker.commerce.productName(),
              title: faker.commerce.productMaterial(),
              desc: faker.commerce.productDescription(),
              price: faker.number.int({ min: 1000, max: 20000 }),
            },
          ]),
        )
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'Account not found',
          }),
        );
    });

    it('http::history all', async () => {
      await supertest(app.getHttpServer())
        .get('/services/history')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.length).not.toEqual(0);
        });
    });

    it('http::history detail', async () => {
      await supertest(app.getHttpServer())
        .get(`/services/history/${user_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          createpath('../folder-text/history-http-entity.txt', res.body);
          expect(res.body.id).toEqual(user_id);
        });
    });
  }

  if (destory_id) {
    it('http::history destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/services/history/${destory_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.OK,
            message: 'History has been delete',
          }),
        );
    });

    it('http::history invalid destroy', async () => {
      await supertest(app.getHttpServer())
        .delete(`/services/history/dqwdqwdq`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST)
        .then((res) =>
          expect(res.body).toEqual({
            status: HttpStatus.BAD_REQUEST,
            message: 'History not found',
          }),
        );
    });
  }
});
