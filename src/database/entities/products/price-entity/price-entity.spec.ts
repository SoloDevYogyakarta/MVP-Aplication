import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { productpriceEntity, ProductPriceInstance } from './price-entity';

describe('ProductPriceEntity', () => {
  let public_id!: string;
  let entity: ModelCtor<ProductPriceInstance>;

  beforeEach(() => {
    entity = productpriceEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    public_id = getField('price-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('update', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      const value = faker.number.int({ min: 100, max: 1000 });
      findOne.value = value;
      findOne.currency = faker.number.int({ min: 2000, max: 100000 });
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
