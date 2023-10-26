import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userEntity } from '../../database/entities/authenticates/user-entity/user-entity';
import { historyEntity } from '../../database/entities/services/history-entity/history-entity';

@Injectable()
export class HistoryService {
  async destroy(public_id: string, user_id: string) {
    await this.isAdmin(user_id);
    const findOne = await historyEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'History has been delete' };
  }

  async isAdmin(public_id: string): Promise<void> {
    const findOne = await userEntity.findOne({ where: { public_id } });
    if (findOne?.role !== 'admin') {
      throw new HttpException('false', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
