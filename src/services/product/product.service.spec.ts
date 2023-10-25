import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { getField } from '../../utils/get-field/get-field';
import { ProductService } from './product.service';
import { omit } from 'lodash';
import { userEntity } from '../../database/entities/authenticates/user-entity/user-entity';

const findOne = userEntity.findOne({
  where: { role: 'admin' },
  order: [['id', 'ASC']],
});

const data = {
  name: faker.commerce.productName(),
  status: faker.helpers.arrayElement([1, 2]),
  condition: faker.helpers.arrayElement([-2, -1, 0, 1, 2]),
  shortdesc: faker.lorem.paragraph(),
  main_stock: faker.helpers.arrayElement([1, 2]),
  reserve_stock: faker.helpers.arrayElement([1, 2]),
  price: {
    value: faker.number.int({ min: 1000, max: 20000 }),
    currency: faker.number.int({ min: 100, max: 2000 }),
  },
};

describe('ProductService', () => {
  let public_id!: string;
  let user_id!: string;
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  try {
    public_id = getField('basic-http-entity').public_id;
    user_id = getField('user-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('create', async () => {
      const result = await service.create(
        data,
        user_id,
        [] as Express.Multer.File[],
      );
      expect(omit(result, ['result'])).toEqual({
        status: HttpStatus.CREATED,
        message: 'Product has been create',
      });
    });

    it('create without images', async () => {
      const result = await service.create(
        data,
        user_id,
        null as Express.Multer.File[],
      );
      expect(omit(result, ['result'])).toEqual({
        status: HttpStatus.CREATED,
        message: 'Product has been create',
      });
    });

    it('updated', async () => {
      const user = await findOne;
      const result = await service.update(
        data,
        public_id,
        [] as Express.Multer.File[],
        user.public_id,
      );
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Product has been update',
      });
    });

    it('updated without images', async () => {
      const user = await findOne;
      const result = await service.update(
        data,
        public_id,
        null as Express.Multer.File[],
        user.public_id,
      );
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Product has been update',
      });
    });

    it('destroy', async () => {
      try {
        const user = await findOne;
        await service.destroy('dqwdqw', user.public_id);
      } catch (err) {
        expect({ status: err.status, message: err.message }).toEqual({
          status: HttpStatus.NOT_FOUND,
          message: 'Not Found',
        });
      }
    });

    it('invalid destroy without admin', async () => {
      try {
        await service.destroy('dqwdq', 'dqwdqwd');
      } catch (err) {
        expect(err.message).toEqual('false');
      }
    });
  }
});
