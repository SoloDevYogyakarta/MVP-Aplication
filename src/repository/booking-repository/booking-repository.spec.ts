import { BookingRepository } from './booking-repository';

describe('BookingRepository', () => {
  let repository: BookingRepository;

  beforeEach(() => {
    repository = new BookingRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());
});
