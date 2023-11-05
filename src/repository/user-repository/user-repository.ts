import { Injectable, Logger } from '@nestjs/common';
import {
  userEntity,
  UserInstance,
} from '../../database/entities/authenticate/user-entity/user-entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  async findAll(): Promise<UserInstance[]> {
    this.logger.log(UserRepository.name);
    return await userEntity.findAll();
  }

  async findOne(public_id: string): Promise<UserInstance> {
    this.logger.log(UserRepository.name);
    return await userEntity.findOne({ where: { public_id } });
  }
}
