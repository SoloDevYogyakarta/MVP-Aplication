import { Injectable, Logger } from '@nestjs/common';
import { sequelize } from '../../database/entities/entity';
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
    let result = await userAssociate.findAll({
      attributes: userAttribute,
      include: userHistoryInclude,
    });
    for (const values of result) {
      const visit = await this.visit(values.id);
      result = JSON.parse(JSON.stringify(result)).map((item: UserInstance) => {
        if (item.id === values.id) {
          item['visit'] = Number(visit);
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
    result['visit'] = Number(await this.visit(id));
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
}
