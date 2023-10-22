import { ModelCtor } from 'sequelize';
import { ProductBasicInstance } from '../../../database/entities/products/basic-entity/basic-entity';
import { getField } from '../../../utils/get-field/get-field';
import {
  productBasicAssociate,
  productBasicAttribute,
  productBasicInclude,
} from './basic-associate';

describe('ProductBasicAssociate', () => {
  let entity: ModelCtor<ProductBasicInstance>;

  beforeEach(() => {
    entity = productBasicAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    it('findOne with relationship', async () => {
      const { public_id } = getField('basic-http-entity');
      const findOne = await entity.findOne({
        where: { public_id },
        attributes: productBasicAttribute,
        include: productBasicInclude,
      });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll with relationship', async () => {
      const findAll = await entity.findAll({
        attributes: productBasicAttribute,
        include: productBasicInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
