import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class SparepartEntity extends BaseEntity {
  text: string;
}

export type SparepartCreationAttribute = Optional<SparepartEntity, 'id'>;
export interface SparepartInstance
  extends Model<SparepartCreationAttribute, SparepartEntity>,
    SparepartEntity {}
export const sparepartEntity = sequelize.define<SparepartInstance>(
  'SPAREPART',
  {
    public_id: DataTypes.STRING,
    text: DataTypes.STRING,
  } as ModelAttributes<SparepartInstance>,
  {
    tableName: 'SPAREPART',
    schema: 'public',
    timestamps: false,
  },
);
