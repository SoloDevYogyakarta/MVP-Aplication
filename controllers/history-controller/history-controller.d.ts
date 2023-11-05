/// <reference types="multer" />
import { Response } from 'express';
import { HistoryService } from '../../services/history-service/history-service';
import { HistoryRepository } from '../../repository/history-repository/history-repository';
import { CustomRequest } from '../../types/custom-request.type';
export declare class ServiceHistoryController {
    private readonly repository;
    private readonly service;
    private readonly logger;
    constructor(repository: HistoryRepository, service: HistoryService);
    create(files: Express.Multer.File[], req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    all(res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
