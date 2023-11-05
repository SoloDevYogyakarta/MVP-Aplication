import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { omit } from 'lodash';
import { createpath } from '../../utils/system/system';
import { getfield } from '../../utils/get-field/get-field';
import { HistoryService } from './history-service';

describe('HistoryService', () => {
  let user_id!: number;
  let service: HistoryService;

  beforeEach(() => {
    service = new HistoryService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  try {
    user_id = getfield('user-http-entity').id;
  } catch (err) {
    // empty
  }

  if (user_id) {
    it('create', async () => {
      const result = await service.create(user_id, [
        {
          name: faker.commerce.productName(),
          title: faker.commerce.productMaterial(),
          desc: faker.commerce.productDescription(),
          price: faker.number.int({ min: 10000, max: 200000 }),
        },
      ]);
      createpath('../folder-text/order-http-entity.txt', result.result);
      expect(omit(result, ['result'])).toEqual({
        status: HttpStatus.CREATED,
        message: 'History has been added',
      });
    });
  }
});
