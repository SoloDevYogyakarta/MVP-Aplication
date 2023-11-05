import { FindAttributeOptions, Includeable } from 'sequelize';
import { userHistoryEntity } from '../../../database/entities/authenticate/history-entity/history-entity';
import { userEntity } from '../../../database/entities/authenticate/user-entity/user-entity';
import {
  orderAssociate,
  orderInclude,
} from '../order-associate/order-associate';

const userAttribute: FindAttributeOptions = {
  include: [
    ['createdAt', 'created_at'],
    ['updatedAt', 'updated_at'],
  ],
  exclude: ['password'],
};

const userInclude: Includeable[] = [
  {
    model: userHistoryEntity,
    attributes: {
      include: [['updatedAt', 'updated_at']],
      exclude: [],
    },
    as: 'activities',
  },
];

const userHistoryInclude: Includeable[] = [
  {
    model: orderAssociate,
    attributes: {
      include: [
        ['createdAt', 'created_at'],
        ['updatedAt', 'updated_at'],
      ],
      exclude: [],
    },
    include: orderInclude,
    as: 'order',
  },
];

userEntity.hasMany(userHistoryEntity, {
  sourceKey: 'id',
  foreignKey: { name: 'user_id', allowNull: true },
  as: 'activities',
});
userEntity.hasMany(orderAssociate, {
  sourceKey: 'id',
  foreignKey: { name: 'user_id', allowNull: true },
  as: 'order',
});

const userAssociate = userEntity;

export { userAssociate, userAttribute, userInclude, userHistoryInclude };
