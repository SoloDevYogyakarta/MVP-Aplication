import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    service = new BookingService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('should create the app', () => expect(service).toMatchSnapshot());
});
