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

  it('should to be defined', () => expect(app).toBeDefined());
});
