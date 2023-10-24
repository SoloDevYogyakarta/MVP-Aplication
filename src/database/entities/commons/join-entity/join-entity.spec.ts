import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { joinEntity, JoinInstance } from './join-entity';

describe('JoinEntity', () => {
  let public_id!: string;
  let entity: ModelCtor<JoinInstance>;

  beforeEach(() => {
    entity = joinEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    public_id = getField('product-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('findOne', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll', async () => {
      const findAll = await entity.findAll();
      expect(findAll.length).not.toEqual(0);
    });
  }
});
