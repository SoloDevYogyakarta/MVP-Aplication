import { Injectable, Logger } from '@nestjs/common';
import {
  promoEntity,
  PromoInstance,
} from '../../database/entities/services/promo-entity/promo-entity';

@Injectable()
export class PromoRepository {
  private readonly logger = new Logger(PromoRepository.name);

  async findAll() {
    this.logger.log(PromoRepository.name);
    return await promoEntity.findAll();
  }

  async findOne(id: number): Promise<PromoInstance> {
    this.logger.log(PromoRepository.name);
    return await promoEntity.findOne({ where: { id } });
  }
}
