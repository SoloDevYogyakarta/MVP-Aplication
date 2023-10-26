import { DyanmicQuery } from '../../validators/query/product.query';
import { HistoryEntity } from '../../database/entities/services/history-entity/history-entity';
export declare class HistoryRepository {
    findOne(public_id: string): Promise<import("../../database/entities/services/history-entity/history-entity").HistoryInstance>;
    findAll(query: DyanmicQuery): Promise<HistoryEntity[]>;
}
