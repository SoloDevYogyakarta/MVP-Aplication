import { BookingService } from './booking-service';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    service = new BookingService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());
});
