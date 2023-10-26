import { Injectable } from '@nestjs/common';
import { sequelize } from '../../database/entities/entity';
import {
  historyAssociate,
  historyAttribute,
  historyInclude,
} from '../../database/associates/history-associate/history-associate';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';
import { DyanmicQuery } from '../../validators/query/product.query';
import { HistoryEntity } from '../../database/entities/services/history-entity/history-entity';

@Injectable()
export class HistoryRepository {
  async findOne(public_id: string) {
    return await historyAssociate.findOne({
      where: { public_id },
      attributes: historyAttribute,
      include: historyInclude,
    });
  }

  async findAll(query: DyanmicQuery) {
    let where = {},
      datas = [];
    where = dynamicFilter(where, datas, query);
    const historyWithTotal = await sequelize.query(`
      SELECT a.*, cast(sum(d.value) as int) as total FROM "SERVICES"."HISTORY" AS a
      LEFT JOIN "COMMONS"."JOIN" AS b ON b.source_id = a.public_id
      LEFT JOIN "PRODUCTS"."BASIC" AS c ON c.public_id = b.foreign_id
      LEFT JOIN "PRODUCTS"."PRICE" AS d ON d.product_id = c.public_id
      GROUP BY a.id
    `);
    const resultHistory = historyWithTotal[0] as HistoryEntity[];
    const result = await historyAssociate.findAll({
      where: where,
      attributes: historyAttribute,
      include: historyInclude,
    });
    return resultHistory.map((item) => {
      const history2 = result.filter((i) => i.public_id === item.public_id);
      if (history2.length) {
        item = Object.assign(item, JSON.parse(JSON.stringify(history2[0])));
      }
      return item;
    });
  }
}
