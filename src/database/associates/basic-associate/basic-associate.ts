import {
  FindAttributeOptions,
  HasManyOptions,
  HasOneOptions,
  Includeable,
} from 'sequelize';
import { productStockEntity } from '../../../database/entities/products/stock-entity/stock-entity';
import { productBasicEntity } from '../../../database/entities/products/basic-entity/basic-entity';
import { productpriceEntity } from '../../../database/entities/products/price-entity/price-entity';
import {
  joinProductAndFileAssociate,
  joinProductAndFileInclude,
} from '../join-associate/join-associate';

const productBasicAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

const productBasicInclude: Includeable[] = [
  {
    model: productpriceEntity,
    as: 'price',
  },
  {
    model: productStockEntity,
    as: 'stock',
  },
  {
    model: joinProductAndFileAssociate,
    include: joinProductAndFileInclude,
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

productBasicEntity.hasOne(productpriceEntity, { ...options, as: 'price' });
productBasicEntity.hasOne(productStockEntity, { ...options, as: 'stock' });
productBasicEntity.hasMany(joinProductAndFileAssociate, {
  sourceKey: 'public_id',
  foreignKey: {
    name: 'source_id',
    allowNull: false,
  },
  as: 'files',
});

const productBasicAssociate = productBasicEntity;

export { productBasicAttribute, productBasicInclude, productBasicAssociate };
