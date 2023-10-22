import { FindAttributeOptions, Includeable } from 'sequelize';
import { fileEntity } from '../../../database/entities/commons/file-entity/file-entity';
import { joinEntity } from '../../../database/entities/commons/join-entity/join-entity';

export const joinProductAndFileAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

export const joinProductAndFileInclude: Includeable[] = [
  {
    model: fileEntity,
    as: 'file',
  },
];

const productAndFileAssociate = joinEntity;

productAndFileAssociate.hasOne(fileEntity, {
  sourceKey: 'foreign_id',
  foreignKey: {
    name: 'public_id',
    allowNull: false,
  },
  as: 'file',
});

export const joinProductAndFileAssociate = productAndFileAssociate;
