import { faker } from '@faker-js/faker';
import { validate } from 'class-validator';
import * as UserDto from './user-dto';

describe('UserDto', () => {
  it('should to be defined', () => expect(UserDto).toBeDefined());

  it('render correctly', () => expect(UserDto).toMatchSnapshot());

  it('LoginField', async () => {
    const data = new UserDto.LoginField();
    data.token = `B ${Math.floor(1000 + Math.random() * 9999)} HSA`;
    data.password = 'password';
    const valid = await validate(data);
    expect(valid.length).toEqual(0);
  });

  it('RegisterField', async () => {
    const data = new UserDto.RegisterField();
    data.plat_number = `B ${Math.floor(1000 + Math.random() * 9999)} HSA`;
    data.phone_number = faker.phone.number();
    data.name = faker.person.fullName();
    data.motor = faker.commerce.productName();
    data.year_production = Math.floor(1000 + Math.random() * 2023);
    data.address = faker.location.streetAddress();
    data.password = 'password';
    data.confirmation = 'password';
    const valid = await validate(data);
    expect(valid.length).toEqual(0);
  });

  it('ChangePasswordField', async () => {
    const data = new UserDto.ChangePasswordField();
    data.plat_number = `B ${Math.floor(1000 + Math.random() * 9999)} HSA`;
    data.old_password = 'password';
    data.password = 'password';
    data.confirmation = 'password';
    const valid = await validate(data);
    expect(valid.length).toEqual(0);
  });
});
