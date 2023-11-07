import { getfield } from '../../utils/get-field/get-field';
import { UserRepository } from './user-repository';

describe('UserRepository', () => {
  let id!: number;
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());

  try {
    id = getfield('user-http-entity').id;
  } catch (err) {
    // empty
  }

  if (id) {
    it('findOne', async () => {
      const findOne = await repository.findOne(id);
      expect(findOne.id).toEqual(id);
    });

    it('findAll', async () => {
      const findAll = await repository.findAll({}, '');
      expect(findAll.length).not.toEqual(0);
    });
  }
});
