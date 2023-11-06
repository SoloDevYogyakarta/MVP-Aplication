import { faker } from '@faker-js/faker';
import { validate } from 'class-validator';
import { PromoField } from './promo-dto';

describe('PromoField', () => {
  it('should to be defined', () => expect(PromoField).toBeDefined());

  it('render correctly', () => expect(PromoField).toMatchSnapshot());

  it('should to be successfully', async () => {
    const data = new PromoField();
    data.name = faker.commerce.productName();
    data.desc = faker.commerce.productDescription();
    data.price = Number(faker.commerce.price());
    data.discount = faker.number.int({ min: 1, max: 100 });
    data.start_time = new Date();
    data.end_time = new Date();
    const valid = await validate(data);
    expect(valid.length).toEqual(0);
  });
});
