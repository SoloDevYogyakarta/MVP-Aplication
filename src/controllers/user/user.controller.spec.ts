import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserService } from '../../services/user/user.service';
import { UserRepository } from '../../repository/user/user.repository';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository, JwtService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should to be defined', () => expect(app).toBeDefined());
});
