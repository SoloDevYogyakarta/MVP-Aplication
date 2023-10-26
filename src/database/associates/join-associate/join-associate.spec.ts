import { ModelCtor } from 'sequelize';
import { JoinInstance } from '../../../database/entities/commons/join-entity/join-entity';
import { getField } from '../../../utils/get-field/get-field';
import {
  joinFileAssociate,
  joinFileAttribute,
  joinFileInclude,
} from './join-associate';

describe('joinProductAndFileAssociate', () => {
  let public_id!: string;
  let entity: ModelCtor<JoinInstance>;

  beforeEach(() => {
    entity = joinFileAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    public_id = getField('join-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('findOne with relationship', async () => {
      const findOne = await entity.findOne({
        where: { public_id },
        attributes: joinFileAttribute,
        include: joinFileInclude,
      });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll with relationship', async () => {
      const findAll = await entity.findAll({
        attributes: joinFileAttribute,
        include: joinFileInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  }
});