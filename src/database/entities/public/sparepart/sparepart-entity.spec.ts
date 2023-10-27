import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { sparepartEntity, SparepartInstance } from './sparepart-entity';

describe('SparepartEntity', () => {
  let public_id!: string;
  let entity: ModelCtor<SparepartInstance>;

  beforeEach(() => {
    entity = sparepartEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('create', async () => {
    const public_id = nanoid();
    const create = await entity.create({
      public_id,
      text: faker.lorem.paragraph(),
    });
    create.save();

    createpath('../../database/dataTxt/sparepart-entity.txt', create);
    expect(create.public_id).toEqual(public_id);
  });

  try {
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('update', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      const text = faker.lorem.paragraph();
      findOne.text = text;
      findOne.save();
      expect(findOne.text).toEqual(text);
    });

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
