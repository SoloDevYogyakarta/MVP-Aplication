import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class OrderEntity extends BaseEntity {
    name: string;
    desc: string;
    user_id: number;
}
export type OrderCreationAttribute = Optional<OrderEntity, 'id'>;
export interface OrderInstance extends Model<OrderCreationAttribute, OrderEntity>, OrderEntity {
}
export declare const orderEntity: import("sequelize").ModelCtor<OrderInstance>;
