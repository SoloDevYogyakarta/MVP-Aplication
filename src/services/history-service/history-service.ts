import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { userEntity } from '../../database/entities/authenticate/user-entity/user-entity';
import { historyEntity } from '../../database/entities/services/history-entity/history-entity';
import { CreateHistoryField } from '../../dto/history-dto/history-dto';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);

  async create(public_id: string, body: CreateHistoryField[]) {
    this.logger.log(HistoryService.name);
    const findOne = await userEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Account not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const values of body) {
      const create = await historyEntity.create({
        ...values,
        user_id: findOne.public_id,
      });
      create.save();
    }
    return { status: HttpStatus.CREATED, message: 'History has been added' };
  }

  async destroy(public_id: string) {
    const findOne = await historyEntity.findOne({ where: { public_id } });
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
