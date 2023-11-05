import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class HistoryEntity extends BaseEntity {
  name: string;
  title: string;
  desc: string;
  price: number;
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
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
  } as ModelAttributes<HistoryInstance>,
  {
    tableName: 'HISTORY',
    schema: 'SERVICES',
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
