import { Injectable } from '@nestjs/common';
import {
  productBasicAssociate,
  productBasicAttribute,
  productBasicInclude,
} from '../../database/associates/basic-associate/basic-associate';
import {
  ProductBasicEntity,
  ProductBasicInstance,
} from '../../database/entities/products/basic-entity/basic-entity';
import { dynamicFilter } from '../../utils/dynamic-filter/dynamic-filter';

@Injectable()
export class ProductRepository {
  async findOne(public_id: string): Promise<ProductBasicInstance> {
    return await productBasicAssociate.findOne({
      where: { public_id },
      attributes: productBasicAttribute,
      include: productBasicInclude,
    });
  }

  async findAll(query: ProductBasicEntity): Promise<ProductBasicInstance[]> {
    let where = {},
      datas = [];
    where = dynamicFilter(where, datas, query);
    return await productBasicAssociate.findAll({
      where: where,
      attributes: productBasicAttribute,
      include: productBasicInclude,
    });
  }
}
