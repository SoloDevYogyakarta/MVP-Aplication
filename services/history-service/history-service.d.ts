/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { CreateHistoryField } from '../../dto/history-dto/history-dto';
export declare class HistoryService {
    private readonly logger;
    create(id: number, desc: string, body: CreateHistoryField[], files: Express.Multer.File[]): Promise<{
        status: HttpStatus;
        message: string;
        result: import("../../database/entities/services/order-entity/order-entity").OrderInstance;
    }>;
    destroy(id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
