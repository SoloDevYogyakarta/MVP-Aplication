import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class OrderEntity extends BaseEntity {
  desc: string;
  user_id: number;
}

export type OrderCreationAttribute = Optional<OrderEntity, 'id'>;
export interface OrderInstance
  extends Model<OrderCreationAttribute, OrderEntity>,
    OrderEntity {}
export const orderEntity = sequelize.define<OrderInstance>(
  'ORDER',
  {
    desc: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  } as ModelAttributes<OrderInstance>,
  {
    tableName: 'ORDER',
    schema: 'PRODUCTS',
  },
);
