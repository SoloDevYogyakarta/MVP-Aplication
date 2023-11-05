import { FindAttributeOptions, Includeable } from 'sequelize';
import { historyEntity } from '../../../database/entities/services/history-entity/history-entity';
import { orderEntity } from '../../../database/entities/services/order-entity/order-entity';

const orderAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

const orderInclude: Includeable[] = [
  {
    model: historyEntity,
    attributes: {
      include: [],
      exclude: ['id', 'order_id'],
    },
    as: 'history',
  },
];

orderEntity.hasMany(historyEntity, {
  sourceKey: 'public_id',
  foreignKey: { name: 'order_id', allowNull: true },
  as: 'history',
});

const orderAssociate = orderEntity;

export { orderAssociate, orderAttribute, orderInclude };
