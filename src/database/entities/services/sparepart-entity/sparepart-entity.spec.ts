import { ModelCtor } from 'sequelize';
import { sparepartEntity, SparepartInstance } from './sparepart-entity';

describe('SparepartEntity', () => {
  let entity: ModelCtor<SparepartInstance>;

  beforeEach(() => {
    entity = sparepartEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());
});
