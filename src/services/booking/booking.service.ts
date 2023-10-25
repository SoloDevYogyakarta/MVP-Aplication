import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookingField } from '../../validators/booking/booking.validator';
import { bookingEntity } from '../../database/entities/services/booking-entity/booking-entity';
import { omit } from 'lodash';
import { nanoid } from 'nanoid';
import { createpath } from '../../utils/system/system';

@Injectable()
export class BookingService {
  private readonly regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  async create(body: BookingField) {
    const data = { username: body.token };
    if (this.regex.test(body.token)) {
      data['email'] = body.token;
      delete data.username;
    }
    const create = await bookingEntity.create({
      public_id: nanoid(),
      ...data,
      ...omit(body, ['token']),
    });
    create.save();
    createpath('../../database/dataTxt/booking-http-entity.txt', create);
    return { status: HttpStatus.CREATED, message: 'Booking has been create' };
  }

  async destroy(public_id: string) {
    const findOne = await bookingEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Booking not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Booking has been delete' };
  }
}
