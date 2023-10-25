import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { createpath } from '../../../../utils/system/system';
import { productPromoEntity, ProductPromoInstance } from './promo-entity';

describe('ProductPromoEntity', () => {
  let product_id!: string;
  let public_id!: string;
  let entity: ModelCtor<ProductPromoInstance>;

  beforeEach(() => {
    entity = productPromoEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    product_id = getField('basic-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (product_id) {
    it('create', async () => {
      const start_time = new Date();
      const end_time = start_time.setDate(start_time.getDate() + 1);
      const promo = await entity.create({
        value: faker.number.int({ min: 1, max: 100 }),
        main_stock: faker.number.int({ min: 1, max: 1 }),
        reverse_stock: faker.number.int({ min: 1, max: 10 }),
        start_time,
        end_time: new Date(end_time),
        product_id,
      });
      promo.save();
      createpath('../../database/dataTxt/promo-entity.txt', promo);
      expect(promo.product_id).toEqual(product_id);
    });
  }

  try {
    public_id = getField('promo-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('udpate', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      const value = faker.number.int({ min: 1, max: 100 });
      findOne.value = value;
      findOne.save();
      expect(findOne.value).toEqual(value);
    });

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
