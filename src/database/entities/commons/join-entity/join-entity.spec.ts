import { ModelCtor } from 'sequelize';
import { joinEntity, JoinInstance } from './join-entity';

describe('JoinEntity', () => {
  let entity: ModelCtor<JoinInstance>;

  beforeEach(() => {
    entity = joinEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());
});
