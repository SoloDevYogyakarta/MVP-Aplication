import { DyanmicQuery } from '../../validators/query/product.query';
import { UserInstance } from '../../database/entities/authenticates/user-entity/user-entity';
export declare class UserRepository {
    findAll(query: DyanmicQuery): Promise<UserInstance[]>;
    findOne(public_id: string): Promise<UserInstance>;
}
