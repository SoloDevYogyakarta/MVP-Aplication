import { Injectable, Logger } from '@nestjs/common';
import {
  sparepartAssociate,
  sparepartAttribute,
  sparepartInclude,
} from '../../database/associates/sparepart-associate/sparepart-associate';
import {
  sparepartEntity,
  SparepartInstance,
} from '../../database/entities/services/sparepart-entity/sparepart-entity';

@Injectable()
export class SparepartRepository {
  private readonly logger = new Logger(SparepartRepository.name);

  async findALl(): Promise<SparepartInstance[]> {
    this.logger.log(SparepartRepository.name);
    return await sparepartAssociate.findAll({
      attributes: sparepartAttribute,
      include: sparepartInclude,
    });
  }

  async findOne(id: number): Promise<SparepartInstance> {
    this.logger.log(SparepartRepository.name);
    return await sparepartEntity.findOne({
      where: { id },
      attributes: sparepartAttribute,
      include: sparepartInclude,
    });
  }
}
