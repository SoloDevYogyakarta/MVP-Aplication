import { PromoRepository } from './promo-repository';

describe('PromoRepository', () => {
  let repository: PromoRepository;

  beforeEach(() => {
    repository = new PromoRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());
});
