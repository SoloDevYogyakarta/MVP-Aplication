import { PromoInstance } from '../../database/entities/services/promo-entity/promo-entity';
export declare class PromoRepository {
    private readonly logger;
    findAll(): Promise<PromoInstance[]>;
    findOne(id: number): Promise<PromoInstance>;
}
