import { ModelCtor } from 'sequelize';
import { getField } from '../../../utils/get-field/get-field';
import { JoinInstance } from '../../../database/entities/commons/join-entity/join-entity';
import {
  joinProductAndFileAssociate,
  joinProductAndFileAttribute,
  joinProductAndFileInclude,
} from './join-associate';

describe('JoinAssociate', () => {
  let entity: ModelCtor<JoinInstance>;

  beforeEach(() => {
    entity = joinProductAndFileAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    it('findOne with relationship', async () => {
      const { public_id } = getField('basic-http-entity');
      const findOne = await entity.findOne({
        where: { source_id: public_id },
        attributes: joinProductAndFileAttribute,
        include: joinProductAndFileInclude,
      });
      expect(findOne.source_id).toEqual(public_id);
    });

    it('findAll with relationship', async () => {
      const findAll = await entity.findAll({
        attributes: joinProductAndFileAttribute,
        include: joinProductAndFileInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
