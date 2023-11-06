import { Injectable, Logger } from '@nestjs/common';
import {
  bookingEntity,
  BookingInstance,
} from '../../database/entities/services/booking-entity/booking-entity';

@Injectable()
export class BookingRepository {
  private readonly logger = new Logger(BookingRepository.name);

  async findAll(): Promise<BookingInstance[]> {
    this.logger.log(BookingRepository.name);
    return await bookingEntity.findAll();
  }

  async findOne(id: number): Promise<BookingInstance> {
    this.logger.log(BookingRepository.name);
    return await bookingEntity.findOne({ where: { id } });
  }
}
