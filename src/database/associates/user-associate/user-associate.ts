import { FindAttributeOptions, Includeable } from 'sequelize';
import { userHistoryEntity } from '../../../database/entities/authenticate/history-entity/history-entity';
import { userEntity } from '../../../database/entities/authenticate/user-entity/user-entity';
import {
  orderAssociate,
  orderInclude,
} from '../order-associate/order-associate';

const userAttribute: FindAttributeOptions = {
  include: [],
  exclude: ['id', 'password'],
};

const userInclude: Includeable[] = [
  {
    model: userHistoryEntity,
    attributes: {
      include: ['updatedAt'],
      exclude: ['id', 'user_id'],
    },
    as: 'activities',
  },
];

const userHistoryInclude: Includeable[] = [
  {
    model: orderAssociate,
    attributes: {
      include: [],
      exclude: ['id', 'user_id'],
    },
    include: orderInclude,
    as: 'order',
  },
];

userEntity.hasMany(userHistoryEntity, {
  sourceKey: 'public_id',
  foreignKey: { name: 'user_id', allowNull: true },
  as: 'activities',
});
userEntity.hasMany(orderAssociate, {
  sourceKey: 'public_id',
  foreignKey: { name: 'user_id', allowNull: true },
  as: 'order',
});

const userAssociate = userEntity;

export { userAssociate, userAttribute, userInclude, userHistoryInclude };
