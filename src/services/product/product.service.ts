import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ProductBasicEntity,
  productBasicEntity,
} from '../../database/entities/products/basic-entity/basic-entity';
import { pick } from 'lodash';
import { joinpath, removepath } from '../../utils/system/system';
import {
  ProductPriceEntity,
  productpriceEntity,
} from '../../database/entities/products/price-entity/price-entity';
import {
  productStockEntity,
  ProductStockEntity,
} from '../../database/entities/products/stock-entity/stock-entity';
import sizeOf from 'image-size';
import { fileEntity } from '../../database/entities/commons/file-entity/file-entity';
import { joinEntity } from '../../database/entities/commons/join-entity/join-entity';
import { nanoid } from 'nanoid';

type Product = ProductBasicEntity & {
  price?: ProductPriceEntity;
  stock?: ProductStockEntity;
};

@Injectable()
export class ProductService {
  async create(body: Product, user_id: string, files: Express.Multer.File[]) {
    const create = await productBasicEntity.create(
      pick({ ...body, user_id }, [
        'name',
        'status',
        'condition',
        'shortdesc',
        'main_stock',
        'reserve_stock',
        'user_id',
      ]),
    );
    create.save();
    const dataPrice =
      typeof body.price === 'string' ? JSON.parse(body.price) : body.price;
    const price = await productpriceEntity.create(
      pick({ ...dataPrice, product_id: create.public_id }, [
        'value',
        'currency',
        'product_id',
      ]),
    );
    const dataStock =
      typeof body.stock === 'string' ? JSON.parse(body.stock) : body.stock;
    const stock = await productStockEntity.create({
      ...dataStock,
      product_id: create.public_id,
    });
    stock.save();
    price.save();
    if (files?.length) {
      for (const file of files) {
        file.path = `/assets${file.path.split('assets')[1]}`;
        const f = await fileEntity.create({
          public_id: nanoid(),
          ...file,
          filepath: file.path,
          ...sizeOf(joinpath(`../../assets/${file.filename}`)),
        });
        f.save();
        const join = await joinEntity.create({
          public_id: nanoid(),
          source_id: create.public_id,
          foreign_id: f.public_id,
        });
        join.save();
      }
    }
    return {
      result: create,
      status: HttpStatus.CREATED,
      message: 'Product has been create',
    };
  }

  async update(body: Product, public_id: string, files: Express.Multer.File[]) {
    const findOne = await productBasicEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    findOne.update(
      pick(body, [
        'name',
        'status',
        'condition',
        'shortdesc',
        'main_stock',
        'reserve_stock',
      ]),
      { where: { public_id } },
    );
    await productpriceEntity.update(
      typeof body.price === 'string' ? JSON.parse(body.price) : body.price,
      {
        where: { product_id: findOne.public_id },
      },
    );
    await productStockEntity.update(
      typeof body.stock === 'string' ? JSON.parse(body.stock) : body.stock,
      {
        where: { product_id: findOne.public_id },
      },
    );
    if (files?.length) {
      for (const file of files) {
        const join = await joinEntity.findOne({
          where: { source_id: findOne.public_id },
        });
        const f = await fileEntity.findOne({
          where: { public_id: join.foreign_id },
        });
        if (f.filepath) {
          try {
            removepath(`../..${f.filepath}`);
          } catch (err) {
            // empty
          }
        }
        f.destroy();
        join.destroy();
        file.path = `/assets${file.path.split('assets')[1]}`;
        const cf = await fileEntity.create({
          public_id: nanoid(),
          ...file,
          filepath: file.path,
          ...sizeOf(joinpath(`../../assets/${file.filename}`)),
        });
        cf.save();
        const cj = await joinEntity.create({
          source_id: findOne.public_id,
          foreign_id: cf.public_id,
        });
        cj.save();
      }
    }
    return { status: HttpStatus.OK, message: 'Product has been update' };
  }

  async destroy(public_id: string) {
    const findOne = await productBasicEntity.findOne({ where: { public_id } });
    if (!findOne) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await productpriceEntity.destroy({
      where: { product_id: findOne.public_id },
    });
    await productStockEntity.destroy({
      where: { product_id: findOne.public_id },
    });
    const joins = await joinEntity.findAll({
      where: { source_id: findOne.public_id },
    });
    if (joins.length) {
      for (const join of joins) {
        const file = await fileEntity.findOne({
          where: { public_id: join.foreign_id },
        });
        if (file.filepath) {
          try {
            removepath(`../..${file.filepath}`);
          } catch (err) {
            // empty
          }
        }
        file.destroy();
        join.destroy();
      }
    }
    findOne.destroy();
    return { status: HttpStatus.OK, message: 'Product has been delete' };
  }
}
