import { Request, Response } from 'express';
import { HistoryRepository } from '../../repository/history/history.repository';
import { DyanmicQuery } from '../../validators/query/product.query';
export declare class HistoryController {
    private readonly repository;
    constructor(repository: HistoryRepository);
    update(req: Request, res: Response): Response<any, Record<string, any>>;
    list(query: DyanmicQuery, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
