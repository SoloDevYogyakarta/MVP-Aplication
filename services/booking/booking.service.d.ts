import { HttpStatus } from '@nestjs/common';
import { BookingField } from '../../validators/booking/booking.validator';
export declare class BookingService {
    private readonly regex;
    create(body: BookingField): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(public_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
