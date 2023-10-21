import { Injectable } from '@nestjs/common';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';
import { DyanmicQuery } from '../../validators/query/product.query';
import {
  historyEntity,
  HistoryInstance,
} from '../../database/entities/products/history-entity/history-entity';

@Injectable()
export class HistoryRepository {
  async findOne(public_id: string): Promise<HistoryInstance> {
    return await historyEntity.findOne({ where: { public_id } });
  }

  async findAll(query: DyanmicQuery): Promise<HistoryInstance[]> {
    let where = {},
      datas = [];
    dynamicFilter(where, datas, query);
    return await historyEntity.findAll({
      where: where,
    });
  }
}
