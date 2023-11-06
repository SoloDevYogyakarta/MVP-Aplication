import { Response } from 'express';
import { BookingField } from '../../dto/booking-dto/booking-dto';
import { BookingRepository } from '../../repository/booking-repository/booking-repository';
import { BookingService } from '../../services/booking-service/booking-service';
import { CustomRequest } from '../../types/custom-request.type';
export declare class BookingController {
    private readonly service;
    private readonly repository;
    private readonly logger;
    constructor(service: BookingService, repository: BookingRepository);
    create(body: BookingField, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    list(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
