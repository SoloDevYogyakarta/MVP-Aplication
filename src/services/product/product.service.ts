import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { historyEntity } from '../../database/entities/products/history-entity/history-entity';
import {
  ProductField,
  Variant,
} from '../../validators/product/product.validator';
import { pick } from 'lodash';
import { productBasicEntity } from '../../database/entities/products/product-basic-entity/product-basic-entity';
import { variantEntity } from '../../database/entities/products/variant-entity/variant-entity';
import { connectEntity } from '../../database/entities/commons/connect-entity/connect-entity';
import { fileEntity } from '../../database/entities/commons/file-entity/file-entity';
import { nanoid } from 'nanoid';
import { createpath, removepath } from '../../utils/system/system';

@Injectable()
export class ProductService {
  async create(
    body: ProductField,
    user_id: string,
    files: Express.Multer.File[],
  ) {
    const basic = await productBasicEntity.create(
      pick({ ...body, user_id }, ['mechanis_name', 'desc', 'user_id']),
    );
    basic.save();
    const history = await historyEntity.create(
      pick({ ...body, product_id: basic.public_id }, [
        'type',
        'date',
        'product_id',
      ]),
    );
    history.save();
    if (body?.variants) {
      const variants =
        typeof body.variants === 'string'
          ? JSON.parse(body.variants)
          : body.variants;
      for (const values of variants) {
        const variant = await variantEntity.create({
          ...pick(values, ['name', 'type', 'desc', 'price']),
          product_id: basic.public_id,
        });
        variant.save();
      }
    }
    if (files.length) {
      for (const file of files) {
        const filepath = file.path.split('/src')[1];
        const file_ = await fileEntity.create({
          public_id: nanoid(),
          filename: file.filename,
          originalname: file.originalname,
          filepath,
          type: file.mimetype.split('/')[0],
        });
        file_.save();
        const connect = await connectEntity.create({
          source_id: basic.public_id,
          foreign_id: file_.public_id,
        });
        connect.save();
      }
    }
    createpath(`../../../src/database/dataTxt/basic-http-entity.txt`, basic);
    return { status: HttpStatus.CREATED, message: 'Product has been create' };
  }

  async update(
    body: ProductField,
    public_id: string,
    files: Express.Multer.File[],
  ) {
    const findOne = await productBasicEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: 'Product not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    findOne.update(pick(body, ['mechanis_name', 'desc']), {
      where: { public_id },
    });
    const history = await historyEntity.findOne({
      where: { product_id: findOne.public_id },
    });
    history.update(pick(body, ['type', 'date']), {
      where: { product_id: findOne.public_id },
    });
    const variants =
      typeof body.variants === 'string'
        ? JSON.parse(body.variants)
        : body.variants;
    for (const variant of variants) {
      const instance = variant as Variant;
      const findVariant = await variantEntity.findOne({
        where: { public_id: instance.public_id },
      });
      if (!findVariant) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, message: 'Variant not found' },
          HttpStatus.BAD_REQUEST,
        );
      }
      findVariant.update(pick(variant, ['name', 'type', 'desc', 'price']), {
        where: { public_id: instance.public_id },
      });
    }
    if (files.length) {
      const c = await connectEntity.findAll({
        where: { source_id: findOne.public_id },
      });
      for (const c_ of c) {
        const f = await fileEntity.findOne({
          where: { public_id: c_.foreign_id },
        });
        c_.destroy();
        if (f.filepath) {
          try {
            removepath(`../..${f.filepath}`);
          } catch (err) {
            // empty
          }
        }
        f.destroy();
      }
      // Create New
      for (const file of files) {
        const filepath = file.path.split('/src')[1];
        const file_ = await fileEntity.create({
          public_id: nanoid(),
          filename: file.filename,
          originalname: file.originalname,
          filepath,
          type: file.mimetype.split('/')[0],
        });
        file_.save();
        const connect = await connectEntity.create({
          source_id: findOne.public_id,
          foreign_id: file_.public_id,
        });
        connect.save();
      }
    }
    return { status: HttpStatus.OK, message: 'Product has been update' };
  }

  async destroy(public_id: string) {
    const findOne = await productBasicEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: 'Product not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const history = await historyEntity.findOne({
      where: { product_id: findOne.public_id },
    });
    history.destroy();
    const variants = await variantEntity.findAll({
      where: { product_id: findOne.public_id },
    });
    for (const variant of variants) {
      variant.destroy();
    }
    const connects = await connectEntity.findAll({
      where: { source_id: findOne.public_id },
    });
    for (const connect of connects) {
      const file = await fileEntity.findOne({
        where: { public_id: connect.foreign_id },
      });
      if (file.filepath) {
        try {
          removepath(`../..${file.filepath}`);
        } catch (err) {
          // empty
        }
      }
      file.destroy();
      connect.destroy();
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Product has been delete' };
  }
}
