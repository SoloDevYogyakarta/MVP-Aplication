import { Injectable, Logger } from '@nestjs/common';
import { sequelize } from '../../database/entities/entity';
import {
  userAssociate,
  userAttribute,
  userHistoryInclude,
} from '../../database/associates/user-associate/user-associate';
import { UserInstance } from '../../database/entities/authenticate/user-entity/user-entity';
import { OrderEntity } from '../../database/entities/services/order-entity/order-entity';

@Injectable()
export class HistoryRepository {
  private readonly logger = new Logger(HistoryRepository.name);

  async findAll(): Promise<UserInstance[]> {
    this.logger.log(HistoryRepository.name);
    let result = await userAssociate.findAll({
      attributes: userAttribute,
      include: userHistoryInclude,
    });
    for (const values of result) {
      const visit = await this.visit(values.id);
      const total = await this.total(values.id);
      const totalOrder = await this.totalOrder(values.id);
      result = JSON.parse(JSON.stringify(result)).map((item: UserInstance) => {
        if (item.id === values.id) {
          item['visit'] = Number(visit);
          item['total'] = total;
        }
        if (totalOrder.length) {
          item['order'] = (
            item as unknown as { order: OrderEntity[] }
          ).order.map((ord) => {
            const total_order = totalOrder.find((i) => i.id === ord.id);
            if (total_order) {
              if (item.id === ord.user_id) {
                ord['total'] = total_order?.total
                  ? Number(total_order.total)
                  : 0;
              }
            }
            return ord;
          });
        }
        return item;
      });
    }
    return result;
  }

  async findOne(id: number): Promise<UserInstance> {
    this.logger.log(HistoryRepository.name);
    let result = await userAssociate.findOne({
      where: { id },
      attributes: userAttribute,
      include: userHistoryInclude,
    });
    result = JSON.parse(JSON.stringify(result));
    for (const values of (result as unknown as { order: OrderEntity[] })
      .order) {
      const total = await this.totalOrder(values.id);
      result['order'] = (
        result as unknown as { order: OrderEntity[] }
      ).order.map((item) => {
        if (item.id === values.id) {
          item['total'] = total;
        }
        return item;
      });
    }
    result['visit'] = Number(await this.visit(id));
    result['total'] = await this.total(id);
    return result;
  }

  async visit(id: number): Promise<number> {
    const query = await sequelize.query(
      `SELECT a.user_id, COUNT(a.user_id) as visit FROM "PRODUCTS"."ORDER" AS a WHERE a.user_id = '${id}' GROUP BY a.user_id `,
    );
    const visit = query[0].find(
      (item: { user_id: number; visit: number }) =>
        Number(item.user_id) === Number(id),
    ) as { user_id: number; visit: number };
    return visit?.visit ? visit.visit : 0;
  }

  async totalOrder(
    id: number,
  ): Promise<{ id: number; user_id: number; total: string }[]> {
    const query = await sequelize.query(`
    SELECT a.id,a.user_id,SUM(CAST(b.price as int)) as total FROM "PRODUCTS"."ORDER" AS a
    LEFT JOIN "SERVICES"."HISTORY" AS b ON b.order_id = a.id WHERE a.user_id = ${id}
    GROUP BY a.id;
    `);
    return query[0] as unknown as {
      id: number;
      user_id: number;
      total: string;
    }[];
  }

  async total(id: number): Promise<number> {
    const query = await sequelize.query(`
      SELECT a.user_id,SUM(CAST(b.price as int)) as total FROM "PRODUCTS"."ORDER" AS a
      LEFT JOIN "SERVICES"."HISTORY" AS b ON b.order_id = a.id WHERE a.user_id = ${id}
      GROUP BY a.id
    `);
    const result = query[0]
      .map((item: { total: string }) => (item.total === null ? 0 : item.total))
      ?.reduce((arr: unknown, curr: unknown) => {
        return Number(arr) + Number(curr);
      }, 0);
    return result ? Number(result) : 0;
  }
}
