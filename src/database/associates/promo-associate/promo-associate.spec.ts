import { ModelCtor } from 'sequelize';
import { ProductPromoInstance } from '../../../database/entities/products/promo-entity/promo-entity';
import { getField } from '../../../utils/get-field/get-field';
import {
  productPromoAssciate,
  productPromoAttribute,
  productPromoInclude,
} from './promo-associate';

describe('ProductPromoAssociate', () => {
  let product_id!: string;
  let entity: ModelCtor<ProductPromoInstance>;

  beforeEach(() => {
    entity = productPromoAssciate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    product_id = getField('basic-http-entity').product_id;
  } catch (err) {
    // empty
  }

  if (product_id) {
    it('findOne with relationship', async () => {
      const findOne = await entity.findOne({
        where: { product_id },
        attributes: productPromoAttribute,
        include: productPromoInclude,
      });
      expect(findOne.product_id).toEqual(product_id);
    });

    it('findAll with relationship', async () => {
      const findAll = await entity.findAll({
        attributes: productPromoAttribute,
        include: productPromoInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  }
});
