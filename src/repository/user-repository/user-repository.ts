import { Injectable, Logger } from '@nestjs/common';
import { filter } from '../../utils/filter/filter';
import {
  userAssociate,
  userAttribute,
  userInclude,
} from '../../database/associates/user-associate/user-associate';
import { UserInstance } from '../../database/entities/authenticate/user-entity/user-entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  async findAll(query: object, type: string): Promise<UserInstance[]> {
    let where = {};
    this.logger.log(UserRepository.name);
    where = filter(query, type);
    return await userAssociate.findAll({
      where: where,
      attributes: userAttribute,
      include: userInclude,
      order: [['id', 'ASC']],
    });
  }

  async findOne(id: number): Promise<UserInstance> {
    this.logger.log(UserRepository.name);
    return await userAssociate.findOne({
      where: { id },
      attributes: userAttribute,
      include: userInclude,
    });
  }
}
