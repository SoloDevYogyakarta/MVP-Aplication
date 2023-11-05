import { ModelCtor } from 'sequelize';
import { omit } from 'lodash';
import { getfield } from '../../../../utils/get-field/get-field';
import { UserInstance } from '../user-entity/user-entity';
import { userHistoryEntity, UserHistoryInstance } from './history-entity';
import { createpath } from '../../../../utils/system/system';

describe('UserHistoryEntity', () => {
  let user!: UserInstance;
  let destroy!: UserInstance;
  let public_id!: string;
  let entity: ModelCtor<UserHistoryInstance>;

  beforeEach(() => {
    entity = userHistoryEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    user = getfield('user-http-entity');
  } catch (err) {
    // empty
  }
  try {
    public_id = getfield('user-history-entity').public_id;
  } catch (err) {
    // empty
  }
  try {
    destroy = getfield('user-destroy-with-relationship-entity');
  } catch (err) {
    // empty
  }

  if (user) {
    it('create', async () => {
      const create = await entity.create({
        ...omit(user, [
          'id',
          'public_id',
          'motor',
          'year_production',
          'role',
          'password',
          'createdAt',
          'updatedAt',
        ]),
        user_id: user.public_id,
      });
      create.save();
      createpath('../folder-text/user-history-entity.txt', create);
      expect(create.user_id).toEqual(user.public_id);
    });
  }

  if (destroy) {
    it('create', async () => {
      const create = await entity.create({
        ...omit(destroy, [
          'id',
          'public_id',
          'motor',
          'year_production',
          'role',
          'password',
          'createdAt',
          'updatedAt',
        ]),
        user_id: destroy.public_id,
      });
      create.save();
      createpath('../folder-text/user-history-destroy-entity.txt', create);
      expect(create.user_id).toEqual(destroy.public_id);
    });
  }

  if (public_id) {
    it('findOne', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  }
});
