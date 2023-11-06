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
      const result = await service.create(
        user_id,
        faker.lorem.paragraph(),
        [
          {
            name: faker.commerce.productName(),
            title: faker.commerce.productMaterial(),
            desc: faker.commerce.productDescription(),
            price: faker.number.int({ min: 10000, max: 200000 }),
            file_desc: faker.lorem.paragraph(),
            browse: 'Upload',
          },
        ],
        [
          {
            fieldname: 'file',
            originalname:
              '391282393_7054748857952078_2554999196306250130_n.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: '/Users/kenedy-/projects/mvpapplication/src/assets',
            filename: 'tgZLo_ji1269CVmmtYgSA.jpeg',
            path: '/Users/kenedy-/projects/mvpapplication/src/assets/tgZLo_ji1269CVmmtYgSA.jpeg',
            size: 409192,
          },
          {
            fieldname: 'file',
            originalname:
              '391282393_7054748857952078_2554999196306250130_n.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: '/Users/kenedy-/projects/mvpapplication/src/assets',
            filename: '8HFb2FXLsoppQEhT0byBX.jpeg',
            path: '/Users/kenedy-/projects/mvpapplication/src/assets/8HFb2FXLsoppQEhT0byBX.jpeg',
            size: 409192,
          },
        ] as Express.Multer.File[],
      );
      createpath('../folder-text/order-http-entity.txt', result.result);
      expect(omit(result, ['result', 'ids', 'findOne'])).toEqual({
        status: HttpStatus.CREATED,
        message: 'History has been added',
      });
    });
  }
});
