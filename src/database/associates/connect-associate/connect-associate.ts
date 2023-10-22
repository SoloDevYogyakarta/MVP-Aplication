import { FindAttributeOptions, Includeable } from 'sequelize';
import { connectEntity } from '../../../database/entities/commons/connect-entity/connect-entity';
import { fileEntity } from '../../../database/entities/commons/file-entity/file-entity';

const connectAttribute: FindAttributeOptions = {
  include: [],
  exclude: [],
};

const connectFileInclude: Includeable[] = [
  {
    model: fileEntity,
    as: 'file',
  },
];

connectEntity.hasOne(fileEntity, {
  sourceKey: 'foreign_id',
  foreignKey: {
    name: 'public_id',
    allowNull: false,
  },
  as: 'file',
});

const connectAssociate = connectEntity;

export { connectAttribute, connectFileInclude, connectAssociate };
