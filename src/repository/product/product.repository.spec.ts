import { getField } from '../../utils/get-field/get-field';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());

  try {
    it('findOne', async () => {
      const { public_id } = getField('basic-entity');
      const result = await repository.findOne(public_id);
      expect(result.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const result = await repository.findAll({});
      expect(result.length).not.toEqual(0);
    });

    it('findAll with query', async () => {
      const { mechanis_name } = getField('basic-entity');
      const result = await repository.findAll({ mechanis_name });
      expect(result.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
