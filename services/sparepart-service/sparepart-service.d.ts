import { HttpStatus } from '@nestjs/common';
import { FreeTextEntity } from '../../database/entities/public/free-text-entity/free-text-entity';
import { SparepartField } from '../../dto/sparepart-dto/sparepart-dto';
export declare class SparepartService {
    private readonly logger;
    create(body: SparepartField[]): Promise<{
        status: HttpStatus;
        message: string;
        create: import("../../database/entities/services/sparepart-entity/sparepart-entity").SparepartInstance;
        free: FreeTextEntity;
    }>;
    update(id: number, body: SparepartField[]): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    freeDestroy(id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
