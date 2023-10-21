import { UserInstance } from '../../database/entities/authenticates/user-entity/user-entity';
import { getField } from '../../utils/get-field/get-field';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  it('should to be defined', () => expect(repository).toBeDefined());

  it('render correctly', () => expect(repository).toMatchSnapshot());

  it('findOne', async () => {
    const result = getField('user-http-entity') as UserInstance;
    const findOne = await repository.findOne(result.public_id);
    expect(findOne.public_id).toEqual(result.public_id);
  });

  it('findAll', async () => {
    const findAll = await repository.findAll();
    expect(findAll.length).not.toEqual(0);
  });
});
