import { FindAttributeOptions, Includeable } from 'sequelize';
import { userEntity } from '../../../database/entities/authenticates/user-entity/user-entity';
import { fileUserAssociate } from '../file-associate/file-associate';

const userAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

const userInclude: Includeable[] = [
  {
    model: fileUserAssociate,
    as: 'file',
  },
];

userEntity.belongsTo(fileUserAssociate, {
  targetKey: 'public_id',
  foreignKey: {
    name: 'file_id',
  },
  as: 'file',
});

const userAssociate = userEntity;
export { userAttribute, userInclude, userAssociate };
