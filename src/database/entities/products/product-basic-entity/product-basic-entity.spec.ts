import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { getField } from '../../../../utils/get-field/get-field';
import { UserInstance } from '../../authenticates/user-entity/user-entity';
import { historyEntity } from '../history-entity/history-entity';
import { variantEntity } from '../variant-entity/variant-entity';
import {
  productBasicEntity,
  ProductBasicInstance,
} from './product-basic-entity';

const type = ['Tuner Up', 'Over Haul'];
const bulkInsert = [
  { name: 'KM', type: '80000', desc: '16000' },
  { name: 'Part replacement', type: 'Merek', desc: 'Catatan' },
  { name: 'Oli', type: 'Motul', desc: '1L' },
  { name: 'Belt', type: 'Gates', desc: '1' },
  { name: 'filter Oli', type: 'Sakura', desc: 'Bawa Sendiri' },
  { name: 'Roller ', type: 'Dr.Pulley', desc: '11gr' },
  { name: '11gr', type: 'N/A', desc: '5pcs' },
  { name: 'oli gearbox', type: 'Valvoline', desc: '120ml' },
  { name: 'rantai', type: 'sss', desc: 'bawa sendiri' },
];

describe('productBasicEntity', () => {
  let entity: ModelCtor<ProductBasicInstance>;

  beforeEach(async () => {
    entity = await productBasicEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('create new product', async () => {
    const { public_id } = getField('user-http-entity') as UserInstance;
    const basic = await entity.create({
      mechanis_name: faker.person.fullName(),
      desc: faker.lorem.paragraphs({ min: 100, max: 200 }),
      user_id: public_id,
    });
    basic.save();
    const history = await historyEntity.create({
      type: type[faker.helpers.arrayElement([0, 1])],
      date: new Date(),
      product_id: basic.public_id,
    });
    history.save();
    for (const values of bulkInsert) {
      const variant = await variantEntity.create({
        ...values,
        product_id: basic.public_id,
      });
      variant.save();
      expect(variant.product_id).toEqual(basic.public_id);
      createpath('../../database/dataTxt/variant-entity.txt', variant);
    }
    createpath('../../database/dataTxt/history-entity.txt', history);
    createpath('../../database/dataTxt/basic-entity.txt', basic);
    expect(basic.user_id).toEqual(public_id);
    expect(history.product_id).toEqual(basic.public_id);
  });

  try {
    it('findOne', async () => {
      const { public_id } = getField('basic-entity') as ProductBasicInstance;
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
