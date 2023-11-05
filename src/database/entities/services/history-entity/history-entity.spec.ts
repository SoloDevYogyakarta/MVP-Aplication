import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { getfield } from '../../../../utils/get-field/get-field';
import { historyEntity, HistoryInstance } from './history-entity';

describe('HistoryEntity', () => {
  let user_id!: string;
  let entity: ModelCtor<HistoryInstance>;

  beforeEach(() => {
    entity = historyEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    user_id = getfield('user-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (user_id) {
    it('create', async () => {
      try {
        const create = await entity.create({
          name: faker.commerce.productName(),
          title: faker.commerce.productMaterial(),
          desc: faker.commerce.productDescription(),
          price: faker.number.int({ min: 10000, max: 200000 }),
          user_id,
        });
        create.save();
        createpath('../folder-text/history-entity.txt', create);
        expect(create.user_id).toEqual(user_id);
      } catch (err) {
        console.log(err);
      }
    });

    it('findOne', async () => {
      const findOne = await entity.findOne({ where: { user_id } });
      expect(findOne.user_id).toEqual(user_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  }
});
