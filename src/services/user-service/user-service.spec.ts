import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { createpath } from '../../utils/system/system';
import { environment } from '../../utils/environment/environment';
import { UserService } from './user-service';
import {
  userEntity,
  UserEntity,
} from '../../database/entities/authenticate/user-entity/user-entity';
import { getfield } from '../../utils/get-field/get-field';

describe('UserService', () => {
  let user!: UserEntity;
  let jwtService: JwtService;
  let service: UserService;

  beforeEach(() => {
    jwtService = new JwtService({
      secret: environment['SECRET'],
      signOptions: {
        expiresIn: '7d',
      },
    });
    service = new UserService(jwtService);
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  try {
    user = getfield('user-http-entity');
  } catch (err) {
    // empty
  }

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

  it('invalid logout', async () => {
    try {
      await service.logout(0);
    } catch (err) {
      expect(err.message).toEqual('false');
    }
  });

  if (user) {
    it('login', async () => {
      const result = await service.login({
        token: user.plat_number,
        password: 'password',
      });
      createpath('../folder-text/token-logout.txt', result.access_token);
      expect(result.access_token).not.toEqual(null);
    });

    it('invalid logout', async () => {
      const user_ = await userEntity.findOne({ where: { is_active: false } });
      const result = await service.logout(user.id);
      user = JSON.parse(JSON.stringify(user_));
      const token = jwtService.sign(
        { data: user },
        { secret: environment['SECRET'] },
      );
      createpath('../folder-text/token-inactive.txt', token);
      expect(omit(result, ['findOne'])).toEqual({ message: true });
    });
  }
});
