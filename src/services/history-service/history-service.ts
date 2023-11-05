import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { orderEntity } from '../../database/entities/services/order-entity/order-entity';
import { userEntity } from '../../database/entities/authenticate/user-entity/user-entity';
import { historyEntity } from '../../database/entities/services/history-entity/history-entity';
import { CreateHistoryField } from '../../dto/history-dto/history-dto';
import { fileEntity } from '../../database/entities/services/files-entity/files-entity';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);

  async create(
    id: number,
    desc: string,
    body: CreateHistoryField[],
    files: Express.Multer.File[],
  ) {
    this.logger.log(HistoryService.name);
    const findOne = await userEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Account not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const order = await orderEntity.create({ desc, user_id: findOne.id });
    order.save();
    for (const values of body) {
      const create = await historyEntity.create({
        ...values,
        order_id: order.id,
      });
      create.save();
    }
    for (const file of files) {
      const filepath = `/assets${file.path.split('/assets')[1]}`;
      const f = await fileEntity.create({
        originalname: file.originalname,
        type: file.mimetype.split('/')[1],
        filepath,
        order_id: order.id,
      });
      f.save();
    }
    return {
      status: HttpStatus.CREATED,
      message: 'History has been added',
      result: order,
    };
  }

  async destroy(id: number) {
    const findOne = await historyEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'History not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'History has been delete' };
  }
}
