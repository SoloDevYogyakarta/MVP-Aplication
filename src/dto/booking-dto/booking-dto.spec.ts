import { faker } from '@faker-js/faker';
import { validate } from 'class-validator';
import moment from 'moment';
import { BookingField } from './booking-dto';

describe('BookingDto', () => {
  it('should to be defined', () => expect(BookingField).toBeDefined());

  it('render correctly', () => expect(BookingField).toMatchSnapshot());

  it('should to be successfully', async () => {
    const data = new BookingField();
    data.name = faker.person.fullName();
    data.title = faker.lorem.paragraph();
    data.desc = faker.lorem.paragraph();
    data.date = new Date();
    data.time = moment(new Date()).format('HH:mm:ss');
    const valid = await validate(data);
    expect(valid.length).toEqual(0);
  });
});
