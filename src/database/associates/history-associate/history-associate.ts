import { FindAttributeOptions, Includeable } from 'sequelize';
import { joinEntity } from '../../../database/entities/commons/join-entity/join-entity';
import { historyEntity } from '../../../database/entities/services/history-entity/history-entity';
import {
  productBasicAssociate,
  productBasicInclude,
} from '../basic-associate/basic-associate';

const joinProductInclude: Includeable[] = [
  {
    model: productBasicAssociate,
    include: productBasicInclude,
    as: 'product',
  },
];

joinEntity.hasOne(productBasicAssociate, {
  sourceKey: 'foreign_id',
  foreignKey: {
    name: 'public_id',
    allowNull: false,
  },
  as: 'product',
});

const historyAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

const historyInclude: Includeable[] = [
  {
    model: joinEntity,
    as: 'products',
    include: joinProductInclude,
  },
];

historyEntity.hasMany(joinEntity, {
  sourceKey: 'public_id',
  foreignKey: {
    name: 'source_id',
    allowNull: false,
  },
  as: 'products',
});

const historyAssociate = historyEntity;

export { historyAttribute, historyInclude, historyAssociate };
