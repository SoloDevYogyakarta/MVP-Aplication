import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class FileEntity extends BaseEntity {
  originalname: string;
  filepath: string;
  type: string;
  desc: string;
  browse: string;
  order_id: number;
}

export type FileCreationAttribute = Optional<FileEntity, 'id'>;
export interface FileInstance
  extends Model<FileCreationAttribute, FileEntity>,
    FileEntity {}
export const fileEntity = sequelize.define<FileInstance>(
  'FILES',
  {
    originalname: DataTypes.STRING,
    filepath: DataTypes.STRING,
    type: DataTypes.STRING,
    desc: DataTypes.TEXT,
    browse: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
  } as ModelAttributes<FileInstance>,
  {
    tableName: 'FILES',
    schema: 'PRODUCTS',
    timestamps: false,
  },
);
