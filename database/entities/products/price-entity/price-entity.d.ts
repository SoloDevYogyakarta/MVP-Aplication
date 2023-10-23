import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class ProductPriceEntity extends BaseEntity {
    value?: number;
    currency?: number;
    product_id?: string;
}
export type ProductPriceCreationAttribute = Optional<ProductPriceEntity, 'id'>;
export interface ProductPriceInstance extends Model<ProductPriceCreationAttribute, ProductPriceEntity>, ProductPriceEntity {
}
export declare const productpriceEntity: import("sequelize").ModelCtor<ProductPriceInstance>;
