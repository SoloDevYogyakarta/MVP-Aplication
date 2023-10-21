import { getField } from '../../utils/get-field/get-field';
import { HistoryRepository } from './history.repository';

describe('HistoryRepository', () => {
  let repository: HistoryRepository;

  beforeEach(() => {
    repository = new HistoryRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());

  try {
    it('findOne', async () => {
      const { public_id } = getField('history-entity');
      const result = await repository.findOne(public_id);
      expect(result.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const result = await repository.findAll({});
      expect(result.length).not.toEqual(0);
    });

    it('findAll with fieldName', async () => {
      const { type } = getField('history-entity');
      const result = await repository.findAll({ type });
      expect(result.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
