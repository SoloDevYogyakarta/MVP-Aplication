import { Response } from 'express';
import { CustomRequest } from '../../types/custom-request.type';
import { OrderService } from '../../services/order-service/order-service';
import { OrderRepository } from '../../repository/order-repository/order-repository';
export declare class ServicesOrderController {
    private readonly service;
    private readonly repository;
    private readonly logger;
    constructor(service: OrderService, repository: OrderRepository);
    list(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
