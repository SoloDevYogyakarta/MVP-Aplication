import { Injectable } from '@nestjs/common';
import {
  userEntity,
  UserInstance,
} from '../../database/entities/authenticates/user-entity/user-entity';

@Injectable()
export class UserRepository {
  async findAll(): Promise<UserInstance[]> {
    const result = await userEntity.findAll();
    return result;
  }

  async findOne(public_id: string): Promise<UserInstance> {
    const result = await userEntity.findOne({ where: { public_id } });
    return result;
  }
}
