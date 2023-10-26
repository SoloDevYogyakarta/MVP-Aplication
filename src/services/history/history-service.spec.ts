import { HttpStatus } from '@nestjs/common';
import { HistoryService } from './history-service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    service = new HistoryService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());

  it('destroy', async () => {
    try {
      await service.destroy('dqwdq', 'dqwdq');
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'false',
      });
    }
  });

  it('invalid admin', async () => {
    try {
      await service.isAdmin('dqdq');
    } catch (err) {
      expect({ status: err.status, message: err.message }).toEqual({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'false',
      });
    }
  });
});
