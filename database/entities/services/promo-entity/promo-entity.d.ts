import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class PromoEntity extends BaseEntity {
    name: string;
    desc: string;
    image: string;
    price: number;
    discount: number;
    start_time: Date;
    end_time: Date;
    user_id: number;
}
export type PromoCreationAttribute = Optional<PromoEntity, 'id'>;
export interface PromoInstance extends Model<PromoCreationAttribute, PromoEntity>, PromoEntity {
}
export declare const promoEntity: import("sequelize").ModelCtor<PromoInstance>;
