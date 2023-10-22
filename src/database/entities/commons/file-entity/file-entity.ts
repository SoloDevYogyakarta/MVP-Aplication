import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class FileEntity extends BaseEntity {
  filename: string;
  filepath: string;
  type: string;
}

export type FileCreationAttribute = Optional<FileEntity, 'id'>;
export interface FileInstance
  extends Model<FileCreationAttribute, FileEntity>,
    FileEntity {}
export const fileEntity = sequelize.define<FileInstance>(
  'FILE',
  {
    public_id: DataTypes.STRING,
    filename: DataTypes.STRING,
    filepath: DataTypes.STRING,
    type: DataTypes.STRING,
  } as ModelAttributes<FileInstance>,
  {
    tableName: 'FILE',
    schema: 'COMMONS',
    timestamps: false,
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
