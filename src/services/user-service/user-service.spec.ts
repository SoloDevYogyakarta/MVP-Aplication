import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { createpath } from '../../utils/system/system';
import { environment } from '../../utils/environment/environment';
import { UserService } from './user-service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    const jwtService = new JwtService({
      secret: environment['SECRET'],
      signOptions: {
        expiresIn: '7d',
      },
    });
    service = new UserService(jwtService);
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  it('create', async () => {
    const result = await service.create({
      plat_number: `BG ${Math.floor(1000 + Math.random() * 9999)} JAK`,
      phone_number: faker.phone.number(),
      name: faker.person.fullName(),
      motor: faker.commerce.productName(),
      year_production: Math.floor(1000 + Math.random() * 2023),
      address: faker.location.streetAddress(),
      password: 'password',
      confirmation: 'password',
    });
    createpath('../folder-text/user-http-entity.txt', result.result);
    expect(omit(result, ['result'])).toEqual({
      status: HttpStatus.CREATED,
      message: 'Account has been create',
    });
  });
});
