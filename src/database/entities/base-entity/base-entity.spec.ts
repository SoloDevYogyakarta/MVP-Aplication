import { BaseEntity } from './base-entity';

describe('BaseEntity', () => {
  it('should to be defined', () => expect(BaseEntity).toBeDefined());

  it('render correctly', () => expect(BaseEntity).toMatchSnapshot());
});
