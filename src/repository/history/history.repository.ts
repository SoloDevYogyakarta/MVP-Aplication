import { Injectable } from '@nestjs/common';
import {
  historyEntity,
  HistoryInstance,
} from '../../database/entities/products/history-entity/history-entity';

@Injectable()
export class HistoryRepository {
  async findOne(public_id: string): Promise<HistoryInstance> {
    return await historyEntity.findOne({ where: { public_id } });
  }

  async findAll(): Promise<HistoryInstance[]> {
    return await historyEntity.findAll();
  }
}
