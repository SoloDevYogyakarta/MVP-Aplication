import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { historyEntity, HistoryInstance } from './history-entity';

describe('historyEntity', () => {
  let entity: ModelCtor<HistoryInstance>;

  beforeEach(async () => {
    entity = await historyEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    it('findOne', async () => {
      const { public_id } = getField('history-entity');
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
