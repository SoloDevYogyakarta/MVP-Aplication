import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { getField } from '../../utils/get-field/get-field';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  it('create', async () => {
    const { public_id } = getField('user-entity');
    const result = await service.create(
      {
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
      },
      public_id,
      {} as any,
    );
    expect(result).toEqual({
      status: HttpStatus.CREATED,
      message: 'Product has been create',
    });
  });

  it('update', async () => {
    const { public_id } = getField('basic-http-entity');
    const result = await service.update(
      {
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
      },
      public_id,
      {} as any,
    );
    expect(result).toEqual({
      status: HttpStatus.OK,
      message: 'Product has been update',
    });
  });

  it('invalid update', async () => {
    try {
      await service.update(
        {
          name: faker.commerce.productName(),
          status: faker.helpers.arrayElement([1, 2]),
          condition: faker.helpers.arrayElement([-2, -1, 0, 1, 2]),
          shortdesc: faker.lorem.paragraph(),
          main_stock: faker.helpers.arrayElement([1, 2]),
          reserve_stock: faker.helpers.arrayElement([1, 2]),
        },
        'dqwdqwd',
        {} as any,
      );
    } catch (err) {
      expect(err.status).toEqual(HttpStatus.NOT_FOUND);
    }
  });

  it('destroy', async () => {
    const { public_id } = getField('basic-destroy-entity');
    const result = await service.destroy(public_id);
    expect(result).toEqual({
      status: HttpStatus.OK,
      message: 'Product has been delete',
    });
  });

  it('invalid destroy', async () => {
    try {
      await service.destroy('dwqdqw');
    } catch (err) {
      expect(err.status).toEqual(HttpStatus.NOT_FOUND);
    }
  });
});
