import { DyanmicQuery } from '../../validators/query/product.query';
import { ProductPromoInstance } from '../../database/entities/products/promo-entity/promo-entity';
export declare class ProductPromoRepository {
    findOne(public_id: string): Promise<ProductPromoInstance>;
    findAll(query: DyanmicQuery): Promise<ProductPromoInstance[]>;
}
