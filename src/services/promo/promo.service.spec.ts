import { HttpStatus } from '@nestjs/common';
import { ProductPromoService } from './promo.service';

describe('ProductPromoService', () => {
  let public_id!: string;
  let user_id!: string;
  let service!: ProductPromoService;

  beforeEach(() => {
    service = new ProductPromoService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  it('invalid create', async () => {
    try {
      await service.create({} as any, 'dqwdqw');
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'false',
      });
    }
  });

  it('invalid update', async () => {
    try {
      await service.update({} as any, 'dqwdqw', 'dqwdqw');
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'false',
      });
    }
  });

  it('invalid destroy', async () => {
    try {
      await service.destroy('dqwdqw', 'dqwdqw');
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'false',
      });
    }
  });

  it('invalid isAdmin', async () => {
    try {
      await service.isAdmin('dqwdqw');
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'false',
      });
    }
  });
});
