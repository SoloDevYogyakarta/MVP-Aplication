import { BookingInstance } from '../../database/entities/services/booking-entity/booking-entity';
import { DyanmicQuery } from '../../validators/query/product.query';
export declare class BookingRepository {
    findOne(public_id: string): Promise<BookingInstance>;
    findAll(query: DyanmicQuery): Promise<BookingInstance[]>;
}
