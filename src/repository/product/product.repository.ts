import { Injectable } from '@nestjs/common';
import {
  productBasicAssociate,
  productBasicAttribute,
  productBasicInclude,
} from '../../database/associates/basic-associate/basic-associate';
import { ProductBasicInstance } from '../../database/entities/products/product-basic-entity/product-basic-entity';
import { Op } from 'sequelize';
import { DyanmicQuery } from 'src/validators/query/product.query';
import { some } from 'lodash';

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
    Object.keys(query).filter((key) => {
      datas = [...datas, { [key]: { [Op.iLike]: query[key] } }];
    });
    if (some(query)) {
      where = { [Op.or]: datas };
    }
    return await productBasicAssociate.findAll({
      where: where,
      attributes: productBasicAttribute,
      include: productBasicInclude,
    });
  }
}
