import { FindAttributeOptions, Includeable } from 'sequelize';
import { userHistoryEntity } from '../../../database/entities/authenticate/history-entity/history-entity';
import { userEntity } from '../../../database/entities/authenticate/user-entity/user-entity';

const userAttribute: FindAttributeOptions = {
  include: [],
  exclude: ['id', 'password'],
};

const userInclude: Includeable[] = [
  {
    model: userHistoryEntity,
    attributes: {
      include: [],
      exclude: ['id', 'user_id'],
    },
    as: 'history',
  },
];

userEntity.hasMany(userHistoryEntity, {
  sourceKey: 'public_id',
  foreignKey: { name: 'user_id', allowNull: true },
  as: 'history',
});

const userAssociate = userEntity;

export { userAssociate, userAttribute, userInclude };
