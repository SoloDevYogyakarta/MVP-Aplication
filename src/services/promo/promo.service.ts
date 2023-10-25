import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userEntity } from '../../database/entities/authenticates/user-entity/user-entity';
import { productBasicEntity } from '../../database/entities/products/basic-entity/basic-entity';
import { PromoField } from '../../validators/promo/promo.validator';
import { omit } from 'lodash';
import { productPromoEntity } from '../../database/entities/products/promo-entity/promo-entity';
import { createpath } from '../../utils/system/system';

@Injectable()
export class ProductPromoService {
  async create(body: PromoField, user_id: string) {
    await this.isAdmin(user_id);
    const findOne = await productBasicEntity.findOne({
      where: { public_id: body.product_id },
    });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const create = await productPromoEntity.create(body);
    create.save();
    createpath('../../database/dataTxt/promo-http-entity.txt', create);
    return { status: HttpStatus.CREATED, message: 'Promo has been create' };
  }

  async update(body: PromoField, public_id: string, user_id: string) {
    await this.isAdmin(user_id);
    const findOne = await productPromoEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Promo not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    findOne.update(omit(body, ['product_id']), { where: { public_id } });
    return { status: HttpStatus.OK, message: 'Promo has been update' };
  }

  async destroy(public_id: string, user_id: string) {
    await this.isAdmin(user_id);
    const findOne = await productPromoEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Promo not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Promo has been delete' };
  }

  async isAdmin(public_id: string): Promise<void> {
    const findOne = await userEntity.findOne({ where: { public_id } });
    if (findOne?.role !== 'admin') {
      throw new HttpException('false', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
