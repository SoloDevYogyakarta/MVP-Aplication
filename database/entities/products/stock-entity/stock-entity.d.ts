import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class ProductStockEntity extends BaseEntity {
    use_stock?: boolean;
    value?: number;
    stock_wording?: number;
    product_id?: string;
}
export type ProductStockCreationAttribute = Optional<ProductStockEntity, 'id'>;
export interface ProductStockInstance extends Model<ProductStockCreationAttribute, ProductStockEntity>, ProductStockEntity {
}
export declare const productStockEntity: import("sequelize").ModelCtor<ProductStockInstance>;
