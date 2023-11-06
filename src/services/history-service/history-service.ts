import {
  ExistingProvider,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { omit, some } from 'lodash';
import { orderEntity } from '../../database/entities/services/order-entity/order-entity';
import { userEntity } from '../../database/entities/authenticate/user-entity/user-entity';
import { historyEntity } from '../../database/entities/services/history-entity/history-entity';
import { CreateHistoryField } from '../../dto/history-dto/history-dto';
import { fileEntity } from '../../database/entities/services/files-entity/files-entity';
import { removepath } from '../../utils/system/system';

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
    let ids = [];
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
      if (some(omit(values, ['id', 'file_desc', 'browse']))) {
        const create = await historyEntity.create({
          ...omit(values, ['id', 'file_desc', 'browse']),
          order_id: order.id,
        });
        create.save();
        ids.push(create.id);
      }
    }
    for (const [index, file] of files.entries()) {
      const filepath = `/assets${file.path.split('/assets')[1]}`;
      const f = await fileEntity.create({
        originalname: file.originalname,
        type: file.mimetype.split('/')[1],
        filepath,
        order_id: order.id,
        desc: body[index]?.file_desc,
        browse: body[index]?.browse,
      });
      f.save();
    }
    return {
      status: HttpStatus.CREATED,
      message: 'History has been added',
      result: order,
      ids,
      findOne,
    };
  }

  async update(
    id: number,
    desc: string,
    body: CreateHistoryField[],
    files: Express.Multer.File[],
  ) {
    const findOne = await orderEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: 'Order not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const values of body) {
      const history = await historyEntity.findOne({
        where: { order_id: findOne.id, id: values.id },
      });
      if (!history) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'History not found',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      history.update(omit(values, ['id', 'file_desc', 'browse']), {
        where: { id: values.id },
      });
    }
    if (files?.length) {
      const fAll = await fileEntity.findAll({
        where: { order_id: findOne.id },
      });
      for (const values of fAll) {
        if (values.filepath) {
          try {
            removepath(`../..${values.filepath}`);
          } catch (err) {
            // empty
          }
        }
        values.destroy();
      }
      for (const [index, file] of files.entries()) {
        const filepath = `/assets${file.path.split('/assets')[1]}`;
        const f = await fileEntity.create({
          originalname: file.originalname,
          type: file.mimetype.split('/')[1],
          filepath,
          order_id: findOne.id,
          desc: body[index]?.file_desc,
          browse: body[index]?.browse,
        });
        f.save();
      }
    }
    findOne.update({ desc }, { where: { id } });
    return { status: HttpStatus.OK, message: 'History has been update' };
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
