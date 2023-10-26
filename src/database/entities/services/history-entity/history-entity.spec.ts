import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { getField } from '../../../../utils/get-field/get-field';
import { joinEntity } from '../../commons/join-entity/join-entity';
import { productBasicEntity } from '../../products/basic-entity/basic-entity';
import { historyEntity, HistoryInstance } from './history-entity';
import { nanoid } from 'nanoid';

describe('HistoryEntity', () => {
  let public_id!: string;
  let entity: ModelCtor<HistoryInstance>;

  beforeEach(() => {
    entity = historyEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('create', async () => {
    const user_id = getField('user-http-entity').public_id;
    const products = await productBasicEntity.findAll({
      offset: faker.number.int({ min: 1, max: 10 }),
      limit: 2,
    });
    const history = await entity.create({
      public_id: nanoid(),
      name: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      user_id,
    });
    history.save();
    for (const product of products) {
      const join = await joinEntity.create({
        source_id: history.public_id,
        foreign_id: product.public_id,
      });
      join.save();
    }

    const secondhistory = await entity.create({
      public_id: nanoid(),
      name: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      user_id,
    });
    history.save();
    for (const product of products) {
      const join = await joinEntity.create({
        source_id: secondhistory.public_id,
        foreign_id: product.public_id,
      });
      join.save();
    }

    createpath(
      '../../database/dataTxt/second-history-entity.txt',
      secondhistory,
    );
    createpath('../../database/dataTxt/history-entity.txt', history);
    expect(history.user_id).toEqual(user_id);
  });

  try {
    public_id = getField('history-entity').public_id;
  } catch (err) {}

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
