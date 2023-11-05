import { ModelCtor } from 'sequelize';
import { orderEntity, OrderInstance } from './order-entity';

describe('OrderEntity', () => {
  let entity: ModelCtor<OrderInstance>;

  beforeEach(() => {
    entity = orderEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());
});
