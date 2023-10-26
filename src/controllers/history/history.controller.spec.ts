import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { getField } from '../../utils/get-field/get-field';
import supertest from 'supertest';
import { HistoryRepository } from '../../repository/history/history.repository';
import env from '../../utils/env/env';
import { HistoryController } from './history.controller';
import { HistoryService } from '../../services/history/history-service';

describe('HistoryController', () => {
  let public_id!: string;
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
            expiresIn: 'd7',
          },
        }),
      ],
      controllers: [HistoryController],
      providers: [HistoryRepository, HistoryService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());

  it('should create the app', () => expect(app).toBeTruthy());

  try {
    public_id = getField('history-entity').public_id;
    destroy_id = getField('second-history-entity').public_id;
    token = getField('token');
  } catch (err) {
    // empty
  }

  if (token) {
    it('http::history get all', async () =>
      await supertest(app.getHttpServer())
        .get('/history')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body).not.toEqual(0)));

    if (public_id) {
      it('http::history get detail', async () =>
        await supertest(app.getHttpServer())
          .get(`/history/${public_id}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)
          .then((res) => expect(res.body.public_id).toEqual(public_id)));

      it('http::history destroy', async () =>
        await supertest(app.getHttpServer())
          .delete(`/history/${destroy_id}`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.OK)
          .then((res) =>
            expect(res.body).toEqual({
              status: HttpStatus.OK,
              message: 'History has been delete',
            }),
          ));

      it('http::history invalid destroy', async () =>
        await supertest(app.getHttpServer())
          .delete(`/history/dqwdqwdq`)
          .set('content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(HttpStatus.NOT_FOUND)
          .then((res) =>
            expect(res.body).toEqual({
              status: HttpStatus.NOT_FOUND,
              message: 'Not Found',
            }),
          ));
    }
  }
});
