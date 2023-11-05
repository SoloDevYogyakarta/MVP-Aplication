/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { CreateHistoryField } from '../../dto/history-dto/history-dto';
export declare class HistoryService {
    private readonly logger;
    create(id: number, desc: string, body: CreateHistoryField[], files: Express.Multer.File[]): Promise<{
        status: HttpStatus;
        message: string;
        result: import("../../database/entities/services/order-entity/order-entity").OrderInstance;
        ids: any[];
        findOne: import("../../database/entities/authenticate/user-entity/user-entity").UserInstance;
    }>;
    update(id: number, desc: string, body: CreateHistoryField[], files: Express.Multer.File[]): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
