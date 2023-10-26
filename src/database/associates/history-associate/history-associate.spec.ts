import { ModelCtor } from 'sequelize';
import { HistoryInstance } from '../../../database/entities/services/history-entity/history-entity';
import { getField } from '../../../utils/get-field/get-field';
import {
  historyAssociate,
  historyAttribute,
  historyInclude,
} from './history-associate';

describe('HistoryAssociate', () => {
  let public_id!: string;
  let entity: ModelCtor<HistoryInstance>;

  beforeEach(() => {
    entity = historyAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    public_id = getField('history-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('findOne', async () => {
      const findOne = await entity.findOne({
        where: { public_id },
        attributes: historyAttribute,
        include: historyInclude,
      });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll({
        attributes: historyAttribute,
        include: historyInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  }
});
