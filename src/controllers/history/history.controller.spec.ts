import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { getField } from '../../utils/get-field/get-field';
import { createpath } from '../../utils/system/system';
import supertest from 'supertest';
import { HistoryRepository } from '../../repository/history/history.repository';
import env from '../../utils/env/env';
import { HistoryController } from './history.controller';

describe('HistoryController', () => {
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
      providers: [HistoryRepository],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('http history all', async () =>
    await supertest(app.getHttpServer())
      .get('/history')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${getField('token')}`)
      .expect(HttpStatus.OK)
      .then((res) => {
        createpath(
          '../../database/dataTxt/history-http-entity.txt',
          res.body[0],
        );
        expect(res.body.length).not.toEqual(0);
      }));

  try {
    it('http history detail', async () => {
      const { public_id } = getField('history-entity');
      await supertest(app.getHttpServer())
        .get(`/history/${public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${getField('token')}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body.public_id).toEqual(public_id));
    });

    it('http history updated', async () => {
      const { public_id } = getField('history-entity');
      await supertest(app.getHttpServer())
        .post(`/history/${public_id}`)
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${getField('token')}`)
        .expect(HttpStatus.OK)
        .then((res) => expect(res.body).toEqual('updated'));
    });
  } catch (err) {
    // empty
  }
});
