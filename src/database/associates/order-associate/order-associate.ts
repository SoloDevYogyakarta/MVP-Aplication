import { FindAttributeOptions, Includeable } from 'sequelize';
import { fileEntity } from '../../../database/entities/services/files-entity/files-entity';
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
  {
    model: fileEntity,
    attributes: {
      include: [],
      exclude: [],
    },
    as: 'files',
  },
];

orderEntity.hasMany(historyEntity, {
  sourceKey: 'id',
  foreignKey: { name: 'order_id', allowNull: true },
  as: 'history',
});
orderEntity.hasMany(fileEntity, {
  sourceKey: 'id',
  foreignKey: { name: 'order_id', allowNull: true },
  as: 'files',
});

const orderAssociate = orderEntity;

export { orderAssociate, orderAttribute, orderInclude };
