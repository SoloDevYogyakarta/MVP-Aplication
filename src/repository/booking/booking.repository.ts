import { Injectable } from '@nestjs/common';
import {
  bookingEntity,
  BookingInstance,
} from '../../database/entities/services/booking-entity/booking-entity';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';
import { DyanmicQuery } from '../../validators/query/product.query';

@Injectable()
export class BookingRepository {
  async findOne(public_id: string): Promise<BookingInstance> {
    return await bookingEntity.findOne({ where: { public_id } });
  }

  async findAll(query: DyanmicQuery): Promise<BookingInstance[]> {
    let where = {},
      datas = [];
    where = dynamicFilter(where, datas, query);
    return await bookingEntity.findAll({
      where: where,
    });
  }
}
