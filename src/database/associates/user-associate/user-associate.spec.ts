import { ModelCtor } from 'sequelize';
import { UserInstance } from '../../../database/entities/authenticates/user-entity/user-entity';
import { getField } from '../../../utils/get-field/get-field';
import { userAssociate, userAttribute, userInclude } from './user-associate';

describe('userAssociate', () => {
  let public_id!: string;
  let entity: ModelCtor<UserInstance>;

  beforeEach(() => {
    entity = userAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    public_id = getField('user-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('findOne with relationship', async () => {
      const findOne = await entity.findOne({
        where: { public_id },
        attributes: userAttribute,
        include: userInclude,
      });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll({
        attributes: userAttribute,
        include: userInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  }
});
