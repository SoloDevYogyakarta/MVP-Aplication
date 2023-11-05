import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { removepath } from '../../utils/system/system';
import { fileEntity } from '../../database/entities/services/files-entity/files-entity';
import { historyEntity } from '../../database/entities/services/history-entity/history-entity';
import { orderEntity } from '../../database/entities/services/order-entity/order-entity';

@Injectable()
export class OrderService {
  async destroy(id: number) {
    const findOne = await orderEntity.findOne({ where: { id } });
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
      where: { order_id: findOne.id },
    });
    for (const values of history) {
      values?.destroy();
    }
    const files = await fileEntity.findAll({ where: { order_id: findOne.id } });
    for (const file of files) {
      if (file.filepath) {
        try {
          removepath(`../..${file.filepath}`);
        } catch (err) {
          // empty
        }
      }
      file?.destroy();
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Order has been delete' };
  }
}
