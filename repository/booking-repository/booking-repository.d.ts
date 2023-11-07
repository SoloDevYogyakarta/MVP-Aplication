import { BookingInstance } from '../../database/entities/services/booking-entity/booking-entity';
export declare class BookingRepository {
    private readonly logger;
    findAll(query: object, type: string): Promise<BookingInstance[]>;
    findOne(id: number): Promise<BookingInstance>;
}
