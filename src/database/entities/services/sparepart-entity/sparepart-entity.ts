import { Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class SparepartEntity extends BaseEntity {}

export type SparePartCreationAttribute = Optional<SparepartEntity, 'id'>;
export interface SparepartInstance
  extends Model<SparePartCreationAttribute, SparepartEntity>,
    SparepartEntity {}
export const sparepartEntity = sequelize.define<SparepartInstance>(
  'SPAREPART',
  {} as ModelAttributes<SparepartInstance>,
  {
    tableName: 'SPAREPART',
    schema: 'SERVICES',
  },
);
