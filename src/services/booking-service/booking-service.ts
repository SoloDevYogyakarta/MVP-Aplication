import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { userEntity } from '../../database/entities/authenticate/user-entity/user-entity';
import { bookingEntity } from '../../database/entities/services/booking-entity/booking-entity';
import { BookingField } from '../../dto/booking-dto/booking-dto';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  async create(body: BookingField) {
    this.logger.log(BookingService.name);
    const findOne = await userEntity.findOne({
      where: { id: body?.user_id ?? 0 },
    });
    if (findOne) {
      body = { ...body, user_id: findOne.id };
    }
    const create = await bookingEntity.create({ ...body });
    create.save();
    return {
      status: HttpStatus.CREATED,
      message: 'Booking has been create',
      create,
    };
  }

  async destroy(id: number) {
    const findOne = await bookingEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Booking not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Booking has been delete' };
  }
}
