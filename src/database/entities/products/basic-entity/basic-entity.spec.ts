import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { getField } from '../../../../utils/get-field/get-field';
import { productBasicEntity, ProductBasicInstance } from './basic-entity';
import { productpriceEntity } from '../price-entity/price-entity';
import { productStockEntity } from '../stock-entity/stock-entity';

describe('ProductBasicEntity', () => {
  let entity: ModelCtor<ProductBasicInstance>;

  beforeEach(() => {
    entity = productBasicEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('create', async () => {
    const { public_id } = getField('user-entity');
    const basic = await entity.create({
      name: faker.commerce.productName(),
      status: faker.helpers.arrayElement([1, 2]),
      condition: faker.helpers.arrayElement([-2, -1, 0, 1, 2]),
      shortdesc: faker.lorem.paragraph(),
      main_stock: faker.helpers.arrayElement([1, 2]),
      reserve_stock: faker.helpers.arrayElement([1, 2]),
      user_id: public_id,
    });
    basic.save();

    const for_destroy = await entity.create({
      name: faker.commerce.productName(),
      status: faker.helpers.arrayElement([1, 2]),
      condition: faker.helpers.arrayElement([-2, -1, 0, 1, 2]),
      shortdesc: faker.lorem.paragraph(),
      main_stock: faker.helpers.arrayElement([1, 2]),
      reserve_stock: faker.helpers.arrayElement([1, 2]),
      user_id: public_id,
    });
    basic.save();
    for_destroy.save();
    createpath('../../database/dataTxt/basic-destroy-entity.txt', for_destroy);
    createpath('../../database/dataTxt/basic-entity.txt', basic);
    expect(basic.user_id).toEqual(public_id);

    // Price
    const price = await productpriceEntity.create({
      value: faker.number.int({ min: 1000, max: 20000 }),
      currency: faker.number.int({ min: 1000, max: 15000 }),
      product_id: basic.public_id,
    });
    price.save();
    createpath('../../database/dataTxt/price-entity.txt', price);
    expect(price.product_id).toEqual(basic.public_id);

    const stock = await productStockEntity.create({
      use_stock: faker.datatype.boolean(),
      value: faker.number.int({ min: 10, max: 155 }),
      stock_wording: faker.number.int({ min: 1, max: 15 }),
      product_id: basic.public_id,
    });
    stock.save();
    createpath('../../database/dataTxt/stock-entity.txt', stock);
    expect(stock.product_id).toEqual(basic.public_id);
  });

  try {
    it('update', async () => {
      const { public_id } = getField('basic-entity');
      const findOne = await entity.findOne({ where: { public_id } });
      const name = `${faker.commerce.productName()}-update`;
      findOne.name = name;
      findOne.save();
      expect(findOne.name).toEqual(name);
    });

    it('findOne', async () => {
      const { public_id } = getField('basic-entity');
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
