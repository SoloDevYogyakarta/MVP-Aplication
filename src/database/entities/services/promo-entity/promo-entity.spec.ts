import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { getfield } from '../../../../utils/get-field/get-field';
import { promoEntity, PromoInstance } from './promo-entity';

describe('PromoEntity', () => {
  let user_id!: number;
  let entity: ModelCtor<PromoInstance>;

  beforeEach(() => {
    entity = promoEntity;
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
        name: faker.commerce.productName(),
        desc: faker.commerce.productDescription(),
        image: faker.image.url(),
        price: Number(faker.commerce.price()),
        discount: faker.number.int({ min: 1, max: 100 }),
        user_id,
      });
      create.save();
      createpath(`../folder-text/promo-entity.txt`, create);
      expect(create.user_id).toEqual(user_id);
    });
  }
});
