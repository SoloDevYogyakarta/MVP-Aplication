import { DyanmicQuery } from '../../validators/query/product.query';
export declare class HistoryRepository {
    findOne(public_id: string): Promise<string>;
    findAll(query: DyanmicQuery): Promise<string>;
}
