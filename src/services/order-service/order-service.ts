import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { historyEntity } from '../../database/entities/services/history-entity/history-entity';
import { orderEntity } from '../../database/entities/services/order-entity/order-entity';

@Injectable()
export class OrderService {
  async destroy(public_id: string) {
    const findOne = await orderEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Order not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const history = await historyEntity.findAll({
      where: { order_id: findOne.public_id },
    });
    for (const values of history) {
      values?.destroy();
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Order has been delete' };
  }
}
