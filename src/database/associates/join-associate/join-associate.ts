import { FindAttributeOptions, Includeable } from 'sequelize';
import { fileEntity } from '../../../database/entities/commons/file-entity/file-entity';
import { joinEntity } from '../../../database/entities/commons/join-entity/join-entity';

export const joinFileAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

export const joinFileInclude: Includeable[] = [
  {
    model: fileEntity,
    as: 'file',
  },
];

const joinFileEntity = joinEntity;

joinFileEntity.hasOne(fileEntity, {
  sourceKey: 'foreign_id',
  foreignKey: {
    name: 'public_id',
    allowNull: false,
  },
  as: 'file',
});

export const joinFileAssociate = joinFileEntity;
