import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { createpath } from '../../../../utils/system/system';
import { fileEntity } from '../../commons/file-entity/file-entity';
import { userEntity, UserInstance } from './user-entity';

describe('UserEntity', () => {
  let public_id!: string;
  let username!: string;
  let entity: ModelCtor<UserInstance>;

  beforeEach(() => {
    entity = userEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('create', async () => {
    const file = await fileEntity.create({});
    file.save();
    const user = await entity.create({
      username: faker.internet.userName(),
      role: faker.helpers.arrayElement([0, 1]) ? 'admin' : 'member',
      password: 'password',
      file_id: file.public_id,
    });
    user.save();
    createpath('../../database/dataTxt/user-entity.txt', user);
    createpath('../../database/dataTxt/file-entity.txt', file);
    expect(user.file_id).toEqual(file.public_id);
  });

  try {
    public_id = getField('user-http-entity').public_id;
    username = getField('user-http-entity').username;
  } catch (err) {}

  if (public_id) {
    it('findOne', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });

    it('update', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      findOne.username = username;
      findOne.save();
      expect(findOne.username).toEqual(username);
    });
  }
});
