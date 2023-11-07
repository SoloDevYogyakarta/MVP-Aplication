import { UserInstance } from '../../database/entities/authenticate/user-entity/user-entity';
export declare class UserRepository {
    private readonly logger;
    findAll(query: object, type: string): Promise<UserInstance[]>;
    findOne(id: number): Promise<UserInstance>;
}
