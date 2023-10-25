import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class ProductPromoEntity extends BaseEntity {
    value: number;
    main_stock: number;
    reverse_stock: number;
    start_time: Date;
    end_time: Date;
    product_id: string;
}
export type ProductPromoCreationAttribute = Optional<ProductPromoEntity, 'id'>;
export interface ProductPromoInstance extends Model<ProductPromoCreationAttribute, ProductPromoEntity>, ProductPromoEntity {
}
export declare const productPromoEntity: import("sequelize").ModelCtor<ProductPromoInstance>;
