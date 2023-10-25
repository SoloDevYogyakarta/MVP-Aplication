import { HttpStatus } from '@nestjs/common';
import { PromoField } from '../../validators/promo/promo.validator';
export declare class ProductPromoService {
    create(body: PromoField, user_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    update(body: PromoField, public_id: string, user_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(public_id: string, user_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    isAdmin(public_id: string): Promise<void>;
}
