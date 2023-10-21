import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class HistoryEntity extends BaseEntity {
  type: string;
  date: Date;
  product_id: string;
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
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    product_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
  } as ModelAttributes<HistoryInstance>,
  {
    tableName: 'HISTORY',
    schema: 'PRODUCTS',
    timestamps: false,
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
