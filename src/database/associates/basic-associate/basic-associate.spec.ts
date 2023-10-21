import { ModelCtor } from 'sequelize';
import { ProductBasicInstance } from '../../../database/entities/products/product-basic-entity/product-basic-entity';
import { getField } from '../../../utils/get-field/get-field';
import {
  productBasicAttribute,
  productBasicEntity,
  productBasicInclude,
} from './basic-associate';

describe('productBasicAssociate', () => {
  let entity: ModelCtor<ProductBasicInstance>;

  beforeEach(async () => {
    entity = await productBasicEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    it('findOne with relationship', async () => {
      const { public_id } = getField('basic-entity');
      const findOne = await entity.findOne({
        where: { public_id },
        attributes: productBasicAttribute,
        include: productBasicInclude,
      });
      console.log(JSON.stringify(findOne));
      expect(findOne.public_id).toEqual(public_id);
    });
  } catch (err) {
    // empty
  }
});
