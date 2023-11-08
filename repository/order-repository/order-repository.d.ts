import { OrderInstance } from '../../database/entities/services/order-entity/order-entity';
import { HistoryRepository } from '../history-repository/history-repository';
export declare class OrderRepository {
    private readonly repository;
    private readonly logger;
    constructor(repository: HistoryRepository);
    findAll(query: object, type: string): Promise<OrderInstance[]>;
    findOne(id: number): Promise<OrderInstance>;
}
