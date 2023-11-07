import { Injectable, Logger } from '@nestjs/common';
import { filter } from '../../utils/filter/filter';
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

  async findALl(query: object, type: string): Promise<SparepartInstance[]> {
    let where = {};
    this.logger.log(SparepartRepository.name);
    where = filter(query, type);
    return await sparepartAssociate.findAll({
      where: where,
      attributes: sparepartAttribute,
      include: sparepartInclude,
      order: [['id', 'ASC']],
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
