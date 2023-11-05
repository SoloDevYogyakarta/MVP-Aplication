import { HistoryRepository } from './history-repository';

describe('HistoryRepository', () => {
  let repository: HistoryRepository;

  beforeEach(() => {
    repository = new HistoryRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());
});
