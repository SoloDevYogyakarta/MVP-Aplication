import { Injectable } from '@nestjs/common';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';
import { DyanmicQuery } from '../../validators/query/product.query';

@Injectable()
export class HistoryRepository {
  async findOne(public_id: string) {
    return 'OK';
  }

  async findAll(query: DyanmicQuery) {
    let where = {},
      datas = [];
    dynamicFilter(where, datas, query);
    return 'OK';
  }
}
