import { UserInstance } from '../../database/entities/authenticate/user-entity/user-entity';
export declare class HistoryRepository {
    private readonly logger;
    findAll(query: object, type: string): Promise<UserInstance[]>;
    findOne(id: number): Promise<UserInstance>;
    visit(id: number): Promise<number>;
    totalOrder(id: number): Promise<{
        id: number;
        user_id: number;
        total: string;
    }[]>;
    total(id: number): Promise<number>;
}
