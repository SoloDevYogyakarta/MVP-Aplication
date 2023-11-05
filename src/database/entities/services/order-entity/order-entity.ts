import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class OrderEntity extends BaseEntity {
  user_id: string;
}

export type OrderCreationAttribute = Optional<OrderEntity, 'id'>;
export interface OrderInstance
  extends Model<OrderCreationAttribute, OrderEntity>,
    OrderEntity {}
export const orderEntity = sequelize.define<OrderInstance>(
  'ORDER',
  {
    public_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
  } as ModelAttributes<OrderInstance>,
  {
    tableName: 'ORDER',
    schema: 'SERVICES',
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
