import { ModelCtor } from 'sequelize';
import { faker } from '@faker-js/faker';
import { userEntity, UserInstance } from './user-entity';
import { createpath } from '../../../../utils/system/system';
import { getField } from '../../../../utils/get-field/get-field';

describe('userEntity', () => {
  let entity: ModelCtor<UserInstance>;

  beforeEach(async () => {
    entity = await userEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('created new user', async () => {
    const username = faker.internet.userName();
    const created = await entity.create({
      username,
      password: 'password',
    });
    created.save();
    createpath('../../database/dataTxt/user-entity.txt', created);
    expect(created.username).toEqual(username);
  });

  try {
    it('updated', async () => {
      const { public_id } = getField('user-entity') as UserInstance;
      const findOne = await entity.findOne({ where: { public_id } });
      const email = faker.internet.email();
      findOne.username = `updated-${faker.internet.userName()}`;
      findOne.email = email;
      findOne.save();
      expect(findOne.email).toEqual(email);
    });

    it('findOne', async () => {
      const { public_id } = getField('user-entity') as UserInstance;
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
