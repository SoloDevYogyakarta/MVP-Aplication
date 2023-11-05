import { ModelCtor } from 'sequelize';
import { OrderInstance } from '../../../database/entities/services/order-entity/order-entity';
import {
  orderAssociate,
  orderAttribute,
  orderInclude,
} from './order-associate';

describe('OrderAssociate', () => {
  let id!: number;
  let entity: ModelCtor<OrderInstance>;

  beforeEach(() => {
    entity = orderAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  if (id) {
    it('findOne with relationship', async () => {
      const findOne = await entity.findOne({
        where: { id },
        attributes: orderAttribute,
        include: orderInclude,
      });
      expect(findOne.id).toEqual(id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll({
        attributes: orderAttribute,
        include: orderInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  }
});
