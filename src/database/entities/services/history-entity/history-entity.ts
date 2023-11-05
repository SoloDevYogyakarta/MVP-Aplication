import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class HistoryEntity extends BaseEntity {
  name: string;
  title: string;
  desc: string;
  price: number;
  order_id: number;
}

export type HistoryCreationAttribute = Optional<HistoryEntity, 'id'>;
export interface HistoryInstance
  extends Model<HistoryCreationAttribute, HistoryEntity>,
    HistoryEntity {}
export const historyEntity = sequelize.define<HistoryInstance>(
  'HISTORY',
  {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
  } as ModelAttributes<HistoryInstance>,
  {
    tableName: 'HISTORY',
    schema: 'SERVICES',
  },
);
