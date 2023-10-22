import {
  FindAttributeOptions,
  HasManyOptions,
  HasOneOptions,
  Includeable,
} from 'sequelize';
import { userEntity } from '../../../database/entities/authenticates/user-entity/user-entity';
import { fileEntity } from '../../../database/entities/commons/file-entity/file-entity';

const fileAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

const fileUserInclude: Includeable[] = [
  {
    model: userEntity,
    as: 'user',
  },
];

const options: HasOneOptions | HasManyOptions = {
  sourceKey: 'public_id',
  foreignKey: {
    name: 'file_id',
    allowNull: true,
  },
};

fileEntity.hasOne(userEntity, { ...options, as: 'user' });

const fileUserAssociate = fileEntity;

export { fileAttribute, fileUserInclude, fileUserAssociate };
