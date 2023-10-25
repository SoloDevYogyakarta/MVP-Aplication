import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { createpath } from '../../../../utils/system/system';
import { bookingEntity, BookingInstance } from './booking-entity';

describe('BookingEntity', () => {
  let user_id!: string;
  let public_id!: string;
  let entity: ModelCtor<BookingInstance>;

  beforeEach(() => {
    entity = bookingEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    user_id = getField('user-http-entity').public_id;
  } catch (err) {
    // empty
  }

  try {
    public_id = getField('booking-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (user_id) {
    it('create', async () => {
      const today = new Date().setDate(new Date().getDate() + Math.random());
      const booking = await entity.create({
        public_id: nanoid(),
        user_id,
        day: new Date(today),
        desc: faker.lorem.paragraph(),
      });
      booking.save();
      createpath('../../database/dataTxt/booking-entity.txt', booking);
      expect(booking.user_id).toEqual(user_id);
    });
  }

  if (public_id) {
    it('findOne', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  }
});
