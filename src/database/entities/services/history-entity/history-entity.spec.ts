import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { getfield } from '../../../../utils/get-field/get-field';
import { historyEntity, HistoryInstance } from './history-entity';
import { orderEntity } from '../order-entity/order-entity';

describe('HistoryEntity', () => {
  let user_id!: number;
  let entity: ModelCtor<HistoryInstance>;

  beforeEach(() => {
    entity = historyEntity;
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
      const order = await orderEntity.create({
        desc: faker.lorem.paragraph(),
        user_id,
      });
      order.save();
      createpath('../folder-text/order-entity.txt', order);
      expect(order.user_id).toEqual(user_id);
      const create = await entity.create({
        name: faker.commerce.productName(),
        title: faker.commerce.productMaterial(),
        desc: faker.commerce.productDescription(),
        price: faker.number.int({ min: 10000, max: 200000 }),
        order_id: order.id,
      });
      create.save();
      createpath('../folder-text/history-entity.txt', create);
      expect(create.order_id).toEqual(order.id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  }
});
