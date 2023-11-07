import { Injectable, Logger } from '@nestjs/common';
import { filter } from '../../utils/filter/filter';
import {
  promoEntity,
  PromoInstance,
} from '../../database/entities/services/promo-entity/promo-entity';

@Injectable()
export class PromoRepository {
  private readonly logger = new Logger(PromoRepository.name);

  async findAll(query: object, type: string) {
    let where = {};
    this.logger.log(PromoRepository.name);
    where = filter(query, type);
    return await promoEntity.findAll({
      where: where,
      order: [['id', 'ASC']],
    });
  }

  async findOne(id: number): Promise<PromoInstance> {
    this.logger.log(PromoRepository.name);
    return await promoEntity.findOne({ where: { id } });
  }
}
