import { faker } from '@faker-js/faker';
import { validate } from 'class-validator';
import { CreateHistoryField } from './history-dto';

describe('HistoryDto', () => {
  it('should to be defined', () => expect(CreateHistoryField).toBeDefined());

  it('render correctly', () => expect(CreateHistoryField).toMatchSnapshot());

  it('create', async () => {
    const data = new CreateHistoryField();
    data.name = faker.commerce.productName();
    data.title = faker.commerce.productMaterial();
    data.desc = faker.commerce.productDescription();
    data.price = faker.number.int({ min: 1000, max: 10000 });
    const valid = await validate(data);
    expect(valid.length).toEqual(0);
  });
});
