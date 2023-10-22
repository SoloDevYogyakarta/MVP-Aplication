import {
  FindAttributeOptions,
  HasManyOptions,
  HasOneOptions,
  Includeable,
} from 'sequelize';
import { historyEntity } from '../../../database/entities/products/history-entity/history-entity';
import { productBasicEntity } from '../../../database/entities/products/product-basic-entity/product-basic-entity';
import { variantEntity } from '../../../database/entities/products/variant-entity/variant-entity';
import {
  connectAssociate,
  connectFileInclude,
} from '../connect-associate/connect-associate';

const productBasicAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

const productBasicInclude: Includeable[] = [
  {
    model: historyEntity,
    as: 'history',
  },
  {
    model: variantEntity,
    as: 'variant',
  },
  {
    model: connectAssociate,
    include: connectFileInclude,
    as: 'files',
  },
];

const options: HasOneOptions | HasManyOptions = {
  sourceKey: 'public_id',
  foreignKey: {
    name: 'product_id',
    allowNull: false,
  },
};

productBasicEntity.hasOne(historyEntity, { ...options, as: 'history' });
productBasicEntity.hasMany(variantEntity, { ...options, as: 'variant' });
productBasicEntity.hasMany(connectAssociate, {
  sourceKey: 'public_id',
  foreignKey: {
    name: 'source_id',
    allowNull: false,
  },
  as: 'files',
});

const productBasicAssociate = productBasicEntity;

export { productBasicAttribute, productBasicInclude, productBasicAssociate };
