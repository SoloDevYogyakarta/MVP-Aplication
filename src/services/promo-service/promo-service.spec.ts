import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { omit } from 'lodash';
import { createpath } from '../../utils/system/system';
import { getfield } from '../../utils/get-field/get-field';
import { PromoService } from './promo-service';

describe('PromoService', () => {
  let service: PromoService;
  let user_id!: number;

  beforeEach(() => {
    service = new PromoService();
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
        {
          name: faker.commerce.productName(),
          desc: faker.commerce.productDescription(),
          price: Number(faker.commerce.price()),
          discount: faker.number.int({ min: 1, max: 100 }),
          start_time: new Date(),
          end_time: new Date(),
        },
        {
          fieldname: 'file',
          originalname: '391282393_7054748857952078_2554999196306250130_n.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          destination: '/Users/kenedy-/projects/mvpapplication/src/assets',
          filename: 'Lu_Fu10pTEdBhilu5Kjf6.jpeg',
          path: '/Users/kenedy-/projects/mvpapplication/src/assets/Lu_Fu10pTEdBhilu5Kjf6.jpeg',
          size: 409192,
        } as Express.Multer.File,
      );
      createpath(
        '../folder-text/promo-destroy-image-entity.txt',
        result.create,
      );
      expect(omit(result, ['create'])).toEqual({
        status: HttpStatus.CREATED,
        message: 'Promo has been create',
      });
    });
  }
});
