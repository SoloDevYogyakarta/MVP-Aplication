import { HttpStatus } from '@nestjs/common';
import { BookingField } from '../../dto/booking-dto/booking-dto';
export declare class BookingService {
    private readonly logger;
    create(body: BookingField): Promise<{
        status: HttpStatus;
        message: string;
        create: import("../../database/entities/services/booking-entity/booking-entity").BookingInstance;
    }>;
    destroy(id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
