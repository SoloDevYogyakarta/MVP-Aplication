import { en_IE, faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { productpriceEntity, ProductPriceInstance } from './price-entity';

describe('ProductPriceEntity', () => {
  let entity: ModelCtor<ProductPriceInstance>;

  beforeEach(() => {
    entity = productpriceEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    it('udpate', async () => {
      const { public_id } = getField('price-entity');
      const findOne = await productpriceEntity.findOne({
        where: { public_id },
      });
      const value = faker.number.int({ min: 100, max: 30000 });
      findOne.value = value;
      findOne.save();
      expect(findOne.value).toEqual(value);
    });

    it('findOne', async () => {
      const { public_id } = getField('price-entity');
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
