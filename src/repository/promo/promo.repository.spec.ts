import { ProductPromoRepository } from './promo.repository';

describe('ProductPromoRepository', () => {
  let public_id!: string;
  let repository!: ProductPromoRepository;

  beforeEach(() => {
    repository = new ProductPromoRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());

  if (public_id) {
    it('findAll', async () => {
      const result = await repository.findAll({});
      expect(result).not.toEqual(0);
    });

    it('findOne', async () => {
      const result = await repository.findOne(public_id);
      expect(result.public_id).toEqual(public_id);
    });
  }
});
