import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { createpath } from '../../../../utils/system/system';
import { productBasicEntity } from '../../products/product-basic-entity/product-basic-entity';
import { fileEntity } from '../file-entity/file-entity';
import { connectEntity, ConnectInstance } from './connect-entity';

describe('connectEntity', () => {
  let entity: ModelCtor<ConnectInstance>;

  beforeEach(() => {
    entity = connectEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  it('create new', async () => {
    const { public_id } = getField('basic-entity');
    const findOne = await productBasicEntity.findOne({ where: { public_id } });
    const arr = Array.from(Array(5).keys());
    for (const empty of arr) {
      const file = await fileEntity.create({});
      file.save();
      const connect = await entity.create({
        source_id: findOne.public_id,
        foreign_id: file.public_id,
      });
      createpath(`../../database/dataTxt/connect-entity.txt`, connect);
    }
  });

  try {
    it('findOne', async () => {
      const { public_id } = getField('connect-entity');
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
