import { Injectable, Logger } from '@nestjs/common';
import { filter } from '../../utils/filter/filter';
import {
  bookingEntity,
  BookingInstance,
} from '../../database/entities/services/booking-entity/booking-entity';

@Injectable()
export class BookingRepository {
  private readonly logger = new Logger(BookingRepository.name);

  async findAll(query: object, type: string): Promise<BookingInstance[]> {
    let where = {};
    this.logger.log(BookingRepository.name);
    where = filter(query, type);
    return await bookingEntity.findAll({
      where: where,
      order: [['id', 'ASC']],
    });
  }

  async findOne(id: number): Promise<BookingInstance> {
    this.logger.log(BookingRepository.name);
    return await bookingEntity.findOne({ where: { id } });
  }
}
