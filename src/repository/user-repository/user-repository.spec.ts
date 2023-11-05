import { getfield } from '../../utils/get-field/get-field';
import { UserRepository } from './user-repository';

describe('UserRepository', () => {
  let public_id!: string;
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());

  try {
    public_id = getfield('user-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('findOne', async () => {
      const findOne = await repository.findOne(public_id);
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await repository.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  }
});
