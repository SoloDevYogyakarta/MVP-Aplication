import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class HistoryEntity extends BaseEntity {
  name: string;
  desc: string;
  user_id: string;
}

export type HistoryCreationAttribute = Optional<HistoryEntity, 'id'>;
export interface HistoryInstance
  extends Model<HistoryCreationAttribute, HistoryEntity>,
    HistoryEntity {}
export const historyEntity = sequelize.define<HistoryInstance>(
  'HISTORY',
  {
    public_id: DataTypes.STRING,
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    user_id: DataTypes.STRING,
  } as ModelAttributes<HistoryInstance>,
  {
    tableName: 'HISTORY',
    schema: 'SERVICES',
  },
);
