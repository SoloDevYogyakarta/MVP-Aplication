import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { sparepartEntity } from '../../services/sparepart-entity/sparepart-entity';
import { freeTextEntity, FreeTextInstance } from './free-text-entity';

describe('FreeTextEntity', () => {
  let entity: ModelCtor<FreeTextInstance>;

  beforeEach(() => {
    entity = freeTextEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('create', async () => {
    const sparepart = await sparepartEntity.create();
    sparepart.save();
    const create = await entity.create({
      text: faker.lorem.paragraph(),
      sparepart_id: sparepart.id,
    });
    create.save();
    createpath('../folder-text/sparepart-entity.txt', sparepart);
    createpath('../folder-text/free-text-entity.txt', create);
    expect(create.sparepart_id).toEqual(sparepart.id);
  });
});
