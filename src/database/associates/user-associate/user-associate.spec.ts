import { ModelCtor } from 'sequelize';
import { UserInstance } from '../../../database/entities/authenticates/user-entity/user-entity';
import { getField } from '../../../utils/get-field/get-field';
import { userAssociate } from './user-associate';

describe('userAssociate', () => {
  let entity: ModelCtor<UserInstance>;

  beforeEach(() => {
    entity = userAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    it('findOne with relationship', async () => {
      const { public_id } = getField('user-http-entity');
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll with relationship', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
