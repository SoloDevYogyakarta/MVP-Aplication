import { Injectable } from '@nestjs/common';
import {
  productBasicAssociate,
  productBasicAttribute,
  productBasicInclude,
} from '../../database/associates/basic-associate/basic-associate';
import { ProductBasicInstance } from '../../database/entities/products/product-basic-entity/product-basic-entity';
import { DyanmicQuery } from '../../validators/query/product.query';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';

@Injectable()
export class ProductRepository {
  async findOne(public_id: string): Promise<ProductBasicInstance> {
    const result = await productBasicAssociate.findOne({
      where: { public_id },
      attributes: productBasicAttribute,
      include: productBasicInclude,
    });
    return result;
  }

  async findAll(query: DyanmicQuery): Promise<ProductBasicInstance[]> {
    let where = {},
      datas = [];
    dynamicFilter(where, datas, query);
    return await productBasicAssociate.findAll({
      where: where,
      attributes: productBasicAttribute,
      include: productBasicInclude,
    });
  }
}
