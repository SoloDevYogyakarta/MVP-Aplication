import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { removepath } from '../../utils/system/system';
import { promoEntity } from '../../database/entities/services/promo-entity/promo-entity';
import { PromoField } from '../../dto/promo-dto/promo-dto';

@Injectable()
export class PromoService {
  private readonly logger = new Logger(PromoService.name);

  async create(user_id: number, body: PromoField, file: Express.Multer.File) {
    this.logger.log(PromoService.name);
    let image = null;
    const findOne = await promoEntity.findOne({ where: { name: body.name } });
    if (findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Promo name already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (file?.path) {
      image = `/assets${file.path.split('/assets')[1]}`;
    }
    const create = await promoEntity.create({ ...body, image, user_id });
    create.save();
    return {
      status: HttpStatus.CREATED,
      message: 'Promo has been create',
      create,
    };
  }

  async update(id: number, body: PromoField, file: Express.Multer.File) {
    this.logger.log(PromoService.name);
    const findOne = await promoEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Promo not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (file?.path) {
      const image = `/assets${file.path.split('/assets')[1]}`;
      if (findOne.image) {
        try {
          removepath(`../..${findOne.image}`);
        } catch (err) {
          // empty
        }
      }
      findOne.image = image;
      findOne.save();
    }
    findOne.update(body, { where: { id } });
    return { status: HttpStatus.OK, message: 'Promo has been update' };
  }

  async destroy(id: number) {
    this.logger.log(PromoService.name);
    const findOne = await promoEntity.findOne({ where: { id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Promo not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (findOne.image) {
      try {
        removepath(`../..${findOne.image}`);
      } catch (err) {
        // empty
      }
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Promo has been delete' };
  }
}
