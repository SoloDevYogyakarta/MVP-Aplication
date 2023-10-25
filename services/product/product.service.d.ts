/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { ProductBasicEntity } from '../../database/entities/products/basic-entity/basic-entity';
import { ProductPriceEntity } from '../../database/entities/products/price-entity/price-entity';
import { ProductStockEntity } from '../../database/entities/products/stock-entity/stock-entity';
type Product = ProductBasicEntity & {
    price?: ProductPriceEntity;
    stock?: ProductStockEntity;
};
export declare class ProductService {
    create(body: Product, user_id: string, files: Express.Multer.File[]): Promise<{
        result: import("../../database/entities/products/basic-entity/basic-entity").ProductBasicInstance;
        status: HttpStatus;
        message: string;
    }>;
    update(body: Product, public_id: string, files: Express.Multer.File[], user_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(public_id: string, user_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    isAdmin(public_id: string): Promise<void>;
}
export {};
