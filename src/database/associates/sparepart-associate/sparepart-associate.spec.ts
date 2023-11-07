import { ModelCtor } from 'sequelize';
import {
  sparepartEntity,
  SparepartInstance,
} from '../../../database/entities/services/sparepart-entity/sparepart-entity';

describe('sparepartAssociate', () => {
  let entity: ModelCtor<SparepartInstance>;

  beforeEach(() => {
    entity = sparepartEntity;
  });

  it('should to be defied', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());
});
