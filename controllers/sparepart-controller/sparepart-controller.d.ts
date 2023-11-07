import { Response } from 'express';
import { CustomRequest } from '../../types/custom-request.type';
import { SparepartField } from '../../dto/sparepart-dto/sparepart-dto';
import { SparepartRepository } from '../../repository/sparepart-repository/sparepart-repository';
import { SparepartService } from '../../services/sparepart-service/sparepart-service';
export declare class SparepartController {
    private readonly repository;
    private readonly service;
    private readonly logger;
    constructor(repository: SparepartRepository, service: SparepartService);
    create(body: SparepartField[], res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: CustomRequest, res: Response, body: SparepartField[]): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    destroyFreeText(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    list(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
