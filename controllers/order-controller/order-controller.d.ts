import { Response } from 'express';
import { CustomRequest } from '../../types/custom-request.type';
import { OrderService } from '../../services/order-service/order-service';
export declare class ServicesOrderController {
    private readonly service;
    private readonly logger;
    constructor(service: OrderService);
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
