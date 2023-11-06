import { Request } from 'express';
import { UserEntity } from '../database/entities/authenticate/user-entity/user-entity';
export interface CustomRequest extends Request {
    params: any;
    user: {
        data: UserEntity;
    };
}
