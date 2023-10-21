import { Injectable } from '@nestjs/common';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';
import { DyanmicQuery } from '../../validators/query/product.query';
import {
  userEntity,
  UserInstance,
} from '../../database/entities/authenticates/user-entity/user-entity';

@Injectable()
export class UserRepository {
  async findAll(query: DyanmicQuery): Promise<UserInstance[]> {
    let where = {},
      datas = [];
    dynamicFilter(where, datas, query);
    const result = await userEntity.findAll();
    return result;
  }

  async findOne(public_id: string): Promise<UserInstance> {
    const result = await userEntity.findOne({ where: { public_id } });
    return result;
  }
}
