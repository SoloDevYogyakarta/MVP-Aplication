import { Request, Response } from 'express';
import { HistoryRepository } from '../../repository/history/history.repository';
import { DyanmicQuery } from '../../validators/query/product.query';
import { CustomRequest } from '../../types/custom-request.type';
import { HistoryService } from '../../services/history/history-service';
export declare class HistoryController {
    private readonly repository;
    private readonly service;
    constructor(repository: HistoryRepository, service: HistoryService);
    list(query: DyanmicQuery, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
