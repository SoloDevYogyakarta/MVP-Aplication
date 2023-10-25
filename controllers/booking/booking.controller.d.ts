import { Request, Response } from 'express';
import { DyanmicQuery } from '../../validators/query/product.query';
import { BookingRepository } from '../../repository/booking/booking.repository';
import { BookingService } from '../../services/booking/booking.service';
import { BookingField } from '../../validators/booking/booking.validator';
export declare class BookingController {
    private readonly repository;
    private readonly service;
    constructor(repository: BookingRepository, service: BookingService);
    created(res: Response, body: BookingField): Promise<Response<any, Record<string, any>>>;
    list(query: DyanmicQuery, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    destory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
