import { FindAttributeOptions, Includeable } from 'sequelize';
import { historyEntity } from '../../../database/entities/services/history-entity/history-entity';
import { orderEntity } from '../../../database/entities/services/order-entity/order-entity';

const orderAttribute: FindAttributeOptions = {
  include: [
    ['createdAt', 'created_at'],
    ['updatedAt', 'updated_at'],
  ],
  exclude: ['createdAt', 'updatedAt'],
};

const orderInclude: Includeable[] = [
  {
    model: historyEntity,
    attributes: {
      include: [
        ['createdAt', 'created_at'],
        ['updatedAt', 'updated_at'],
      ],
      exclude: ['order_id', 'createdAt', 'updatedAt'],
    },
    as: 'history',
  },
];

orderEntity.hasMany(historyEntity, {
  sourceKey: 'id',
  foreignKey: { name: 'order_id', allowNull: true },
  as: 'history',
});

const orderAssociate = orderEntity;

export { orderAssociate, orderAttribute, orderInclude };
