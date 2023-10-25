import { FindAttributeOptions, Includeable } from 'sequelize';
import { productPromoEntity } from '../../../database/entities/products/promo-entity/promo-entity';
import { productBasicAssociate } from '../basic-associate/basic-associate';

const productPromoAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

const productPromoInclude: Includeable[] = [
  {
    model: productBasicAssociate,
    as: 'product',
  },
];

productPromoEntity.hasOne(productBasicAssociate, {
  sourceKey: 'product_id',
  foreignKey: {
    name: 'public_id',
    allowNull: false,
  },
  as: 'product',
});

const productPromoAssciate = productPromoEntity;

export { productPromoAttribute, productPromoInclude, productPromoAssciate };
