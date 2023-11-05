import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { ModelCtor } from 'sequelize';
import { getfield } from '../../../../utils/get-field/get-field';
import { createpath } from '../../../../utils/system/system';
import { userEntity, UserInstance } from './user-entity';

describe('UserEntity', () => {
  let public_id!: string;
  let entity: ModelCtor<UserInstance>;

  beforeEach(() => {
    entity = userEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('create', async () => {
    const create = await entity.create({
      plat_number: `B ${Math.floor(1000 + Math.random() * 9999)} SHA`,
      phone_number: faker.phone.number(),
      name: faker.person.fullName(),
      motor: faker.commerce.productName(),
      address: faker.location.streetAddress(),
      year_production: Math.floor(1000 + Math.random() * 2023),
      role: 'admin',
      password: await bcrypt.hashSync('password', 10),
    });
    create.save();
    createpath('../folder-text/user-entity.txt', create);
    expect(create.plat_number).not.toBe(null);
  });

  try {
    public_id = getfield('user-entity').public_id;
  } catch (err) {
    // empty
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
