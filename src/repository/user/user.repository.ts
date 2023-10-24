import { Injectable } from '@nestjs/common';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';
import { DyanmicQuery } from '../../validators/query/product.query';
import { UserInstance } from '../../database/entities/authenticates/user-entity/user-entity';
import {
  userAssociate,
  userInclude,
} from '../../database/associates/user-associate/user-associate';

@Injectable()
export class UserRepository {
  async findAll(query: DyanmicQuery): Promise<UserInstance[]> {
    let where = {},
      datas = [];
    where = dynamicFilter(where, datas, query);
    const result = await userAssociate.findAll({
      where: where,
      include: userInclude,
      order: [['createdAt', 'DESC']],
    });
    return result;
  }

  async findOne(public_id: string): Promise<UserInstance> {
    const result = await userAssociate.findOne({
      where: { public_id },
      include: userInclude,
    });
    return result;
  }
}
