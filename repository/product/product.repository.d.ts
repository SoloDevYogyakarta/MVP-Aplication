import { ProductBasicEntity, ProductBasicInstance } from '../../database/entities/products/basic-entity/basic-entity';
export declare class ProductRepository {
    findOne(public_id: string): Promise<ProductBasicInstance>;
    findAll(query: ProductBasicEntity): Promise<ProductBasicInstance[]>;
}
