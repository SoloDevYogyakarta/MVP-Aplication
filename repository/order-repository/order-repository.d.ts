import { OrderInstance } from 'src/database/entities/services/order-entity/order-entity';
export declare class OrderRepository {
    private readonly logger;
    findAll(query: object, type: string): Promise<OrderInstance[]>;
    findOne(id: number): Promise<OrderInstance>;
}
