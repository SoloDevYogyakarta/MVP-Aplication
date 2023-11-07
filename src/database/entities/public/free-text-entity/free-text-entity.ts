import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class FreeTextEntity extends BaseEntity {
  text: string;
  sparepart_id: number;
}

export type FreeTextCreationAttribute = Optional<FreeTextEntity, 'id'>;
export interface FreeTextInstance
  extends Model<FreeTextCreationAttribute, FreeTextEntity>,
    FreeTextEntity {}
export const freeTextEntity = sequelize.define<FreeTextInstance>(
  'TEXT',
  {
    text: DataTypes.TEXT,
    sparepart_id: DataTypes.INTEGER,
  } as ModelAttributes<FreeTextInstance>,
  {
    tableName: 'TEXT',
    schema: 'public',
  },
);
