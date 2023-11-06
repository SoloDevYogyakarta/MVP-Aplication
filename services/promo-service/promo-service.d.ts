/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { PromoField } from '../../dto/promo-dto/promo-dto';
export declare class PromoService {
    private readonly logger;
    create(user_id: number, body: PromoField, file: Express.Multer.File): Promise<{
        status: HttpStatus;
        message: string;
        create: import("../../database/entities/services/promo-entity/promo-entity").PromoInstance;
    }>;
    update(id: number, body: PromoField, file: Express.Multer.File): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
