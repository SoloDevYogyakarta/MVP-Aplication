import { Injectable, Logger } from '@nestjs/common';
import {
  sparepartEntity,
  SparepartInstance,
} from '../../database/entities/services/sparepart-entity/sparepart-entity';

@Injectable()
export class SparepartRepository {
  private readonly logger = new Logger(SparepartRepository.name);

  async findALl(): Promise<SparepartInstance[]> {
    this.logger.log(SparepartRepository.name);
    return await sparepartEntity.findAll();
  }

  async findOne(id: number): Promise<SparepartInstance> {
    this.logger.log(SparepartRepository.name);
    return await sparepartEntity.findOne({ where: { id } });
  }
}
