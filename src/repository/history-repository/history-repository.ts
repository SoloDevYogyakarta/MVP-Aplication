import { Injectable, Logger } from '@nestjs/common';
import {
  userAssociate,
  userAttribute,
  userHistoryInclude,
} from '../../database/associates/user-associate/user-associate';
import { UserInstance } from '../../database/entities/authenticate/user-entity/user-entity';

@Injectable()
export class HistoryRepository {
  private readonly logger = new Logger(HistoryRepository.name);

  async findAll(): Promise<UserInstance[]> {
    this.logger.log(HistoryRepository.name);
    return await userAssociate.findAll({
      attributes: userAttribute,
      include: userHistoryInclude,
    });
  }

  async findOne(public_id: string): Promise<UserInstance> {
    this.logger.log(HistoryRepository.name);
    return await userAssociate.findOne({
      where: { public_id },
      attributes: userAttribute,
      include: userHistoryInclude,
    });
  }
}
