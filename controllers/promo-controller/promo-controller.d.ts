/// <reference types="multer" />
import { Response } from 'express';
import { PromoService } from '../../services/promo-service/promo-service';
import { CustomRequest } from '../../types/custom-request.type';
import { PromoRepository } from '../../repository/promo-repository/promo-repository';
export declare class PromoController {
    private readonly service;
    private readonly repository;
    private readonly logger;
    constructor(service: PromoService, repository: PromoRepository);
    create(file: Express.Multer.File, req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    update(file: Express.Multer.File, req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    all(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
