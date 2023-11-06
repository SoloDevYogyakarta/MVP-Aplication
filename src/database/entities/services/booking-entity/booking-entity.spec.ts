import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { getfield } from '../../../../utils/get-field/get-field';
import { bookingEntity, BookingInstance } from './booking-entity';
import moment from 'moment';
import { createpath } from '../../../../utils/system/system';

describe('BookingEntity', () => {
  let user_id!: number;
  let entity: ModelCtor<BookingInstance>;

  beforeEach(() => {
    entity = bookingEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    user_id = getfield('user-http-entity').id;
  } catch (err) {
    // empty
  }

  if (user_id) {
    it('create', async () => {
      const create = await entity.create({
        name: faker.person.fullName(),
        user_id,
        title: faker.lorem.paragraph(),
        desc: faker.lorem.paragraph(),
        date: new Date(),
        time: moment(new Date()).format('HH:mm:ss'),
      });
      create.save();
      createpath('../folder-text/booking-entity.txt', create);
      expect(create.user_id).toEqual(user_id);
    });
  }
});
