import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class ProductBasicEntity extends BaseEntity {
    name?: string;
    status?: number;
    condition?: number;
    shortdesc?: string;
    main_stock?: number;
    reserve_stock?: number;
    user_id?: string;
}
export type ProductBasicCreationAttribute = Optional<ProductBasicEntity, 'id'>;
export interface ProductBasicInstance extends Model<ProductBasicCreationAttribute, ProductBasicEntity>, ProductBasicEntity {
}
export declare const productBasicEntity: import("sequelize").ModelCtor<ProductBasicInstance>;
