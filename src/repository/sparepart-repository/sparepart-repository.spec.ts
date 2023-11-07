import { SparepartRepository } from './sparepart-repository';

describe('SparepartRepository', () => {
  let repository: SparepartRepository;

  beforeEach(() => {
    repository = new SparepartRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());
});
