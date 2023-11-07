import { SparepartInstance } from '../../database/entities/services/sparepart-entity/sparepart-entity';
export declare class SparepartRepository {
    private readonly logger;
    findALl(query: object, type: string): Promise<SparepartInstance[]>;
    findOne(id: number): Promise<SparepartInstance>;
}
