import { faker } from '@faker-js/faker';
import { validate } from 'class-validator';
import { SparepartField } from './sparepart-dto';

describe('SparepartField', () => {
  it('should to be defined', () => expect(SparepartField).toBeDefined());

  it('render correctly', () => expect(SparepartField).toMatchSnapshot());

  it('should to be successfully', async () => {
    const data = new SparepartField();
    data.text = faker.lorem.paragraph();
    const valid = await validate(data);
    expect(valid.length).toEqual(0);
  });
});
