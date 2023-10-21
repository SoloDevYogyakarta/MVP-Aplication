import { Injectable } from '@nestjs/common';
import {
  productBasicAssociate,
  productBasicAttribute,
  productBasicInclude,
} from '../../database/associates/basic-associate/basic-associate';
import { ProductBasicInstance } from '../../database/entities/products/product-basic-entity/product-basic-entity';

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

  async findAll(): Promise<ProductBasicInstance[]> {
    return await productBasicAssociate.findAll({
      attributes: productBasicAttribute,
      include: productBasicInclude,
    });
  }
}
