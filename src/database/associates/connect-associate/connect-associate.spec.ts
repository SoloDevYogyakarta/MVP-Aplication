import { ModelCtor } from 'sequelize';
import { ConnectInstance } from '../../../database/entities/commons/connect-entity/connect-entity';
import { getField } from '../../../utils/get-field/get-field';
import {
  connectAssociate,
  connectAttribute,
  connectFileInclude,
} from './connect-associate';

describe('connectAssociate', () => {
  let entity: ModelCtor<ConnectInstance>;

  beforeEach(() => {
    entity = connectAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    it('findOne with relationship', async () => {
      const { public_id } = getField('connect-entity');
      const findOne = await entity.findOne({
        where: { public_id },
        attributes: connectAttribute,
        include: connectFileInclude,
      });
    });

    it('findAll with relationship', async () => {
      const findAll = await entity.findAll({
        attributes: connectAttribute,
        include: connectFileInclude,
      });
    });
  } catch (err) {
    // empty
  }
});
