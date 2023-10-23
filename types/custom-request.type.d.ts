import { UserInstance } from 'src/database/entities/authenticates/user-entity/user-entity';
export interface CustomRequest extends Request {
    user: {
        data: UserInstance;
    };
}
