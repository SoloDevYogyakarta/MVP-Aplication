import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { variantEntity, VariantInstance } from './variant-entity';

describe('variantEntity', () => {
  let entity: ModelCtor<VariantInstance>;

  beforeEach(async () => {
    entity = await variantEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    it('findOne', async () => {
      const { public_id } = getField('variant-entity');
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
