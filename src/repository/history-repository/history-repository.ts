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
      const visit = await this.visit(values.public_id);
      result = JSON.parse(JSON.stringify(result)).map((item: UserInstance) => {
        if (item.public_id === values.public_id) {
          item['visit'] = visit;
        }
        return item;
      });
    }
    return result;
  }

  async findOne(public_id: string): Promise<UserInstance> {
    this.logger.log(HistoryRepository.name);
    let result = await userAssociate.findOne({
      where: { public_id },
      attributes: userAttribute,
      include: userHistoryInclude,
    });
    result = JSON.parse(JSON.stringify(result));
    result['visit'] = await this.visit(public_id);
    return result;
  }

  async visit(public_id: string): Promise<number> {
    const query = await sequelize.query(
      `SELECT a.user_id,COUNT(*) as visit FROM 'SERVICES.ORDER' AS a WHERE a.user_id = '${public_id}' `,
    );
    const visit = query[0].find(
      (item: { user_id: string; visit: number }) => item.user_id === public_id,
    ) as { user_id: string; visit: number };
    return visit?.visit ? visit.visit : 0;
  }
}
