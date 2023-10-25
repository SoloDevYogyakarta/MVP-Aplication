import { Response } from 'express';
import { CustomRequest } from '../../types/custom-request.type';
import { ProductPromoRepository } from '../../repository/promo/promo.repository';
import { DyanmicQuery } from '../../validators/query/product.query';
import { PromoField } from '../../validators/promo/promo.validator';
import { ProductPromoService } from '../../services/promo/promo.service';
export declare class PromoController {
    private readonly repository;
    private readonly service;
    constructor(repository: ProductPromoRepository, service: ProductPromoService);
    created(req: CustomRequest, res: Response, body: PromoField): Promise<Response<any, Record<string, any>>>;
    updated(req: CustomRequest, res: Response, body: PromoField): Promise<Response<any, Record<string, any>>>;
    list(query: DyanmicQuery, req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
