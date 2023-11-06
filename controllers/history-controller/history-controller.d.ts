/// <reference types="multer" />
import { Response } from 'express';
import { HistoryService } from '../../services/history-service/history-service';
import { CustomRequest } from '../../types/custom-request.type';
export declare class ServiceHistoryController {
    private readonly service;
    private readonly logger;
    constructor(service: HistoryService);
    create(files: Express.Multer.File[], req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    update(files: Express.Multer.File[], req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
