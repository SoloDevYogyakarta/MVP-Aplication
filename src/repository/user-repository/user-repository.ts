import { Injectable, Logger } from '@nestjs/common';
import {
  userAssociate,
  userAttribute,
  userInclude,
} from '../../database/associates/user-associate/user-associate';
import { UserInstance } from '../../database/entities/authenticate/user-entity/user-entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  async findAll(): Promise<UserInstance[]> {
    this.logger.log(UserRepository.name);
    return await userAssociate.findAll({
      attributes: userAttribute,
      include: userInclude,
    });
  }

  async findOne(public_id: string): Promise<UserInstance> {
    this.logger.log(UserRepository.name);
    return await userAssociate.findOne({
      where: { public_id },
      attributes: userAttribute,
      include: userInclude,
    });
  }
}
