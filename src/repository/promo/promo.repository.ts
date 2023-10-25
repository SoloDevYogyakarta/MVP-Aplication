import { Injectable } from '@nestjs/common';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';
import { DyanmicQuery } from '../../validators/query/product.query';
import {
  productPromoAssciate,
  productPromoAttribute,
  productPromoInclude,
} from '../../database/associates/promo-associate/promo-associate';
import { ProductPromoInstance } from '../../database/entities/products/promo-entity/promo-entity';

@Injectable()
export class ProductPromoRepository {
  async findOne(public_id: string): Promise<ProductPromoInstance> {
    return await productPromoAssciate.findOne({
      where: { public_id },
      attributes: productPromoAttribute,
      include: productPromoInclude,
    });
  }

  async findAll(query: DyanmicQuery): Promise<ProductPromoInstance[]> {
    let where = {},
      datas = [];
    where = dynamicFilter(where, datas, query);
    return await productPromoAssciate.findAll({
      where: where,
      attributes: productPromoAttribute,
      include: productPromoInclude,
    });
  }
}
