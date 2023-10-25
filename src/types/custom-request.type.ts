import { Request } from 'express';
import { UserInstance } from '../database/entities/authenticates/user-entity/user-entity';

export interface CustomRequest extends Request {
  user: {
    data: UserInstance;
  };
}
