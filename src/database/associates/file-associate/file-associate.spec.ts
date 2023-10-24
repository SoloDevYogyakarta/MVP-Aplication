import { ModelCtor } from 'sequelize';
import { FileInstance } from '../../../database/entities/commons/file-entity/file-entity';
import { getField } from '../../../utils/get-field/get-field';
import {
  fileAttribute,
  fileUserAssociate,
  fileUserInclude,
} from './file-associate';

describe('fileUserAssociate', () => {
  let public_id!: string;
  let entity: ModelCtor<FileInstance>;

  beforeEach(() => {
    entity = fileUserAssociate;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    public_id = getField('file-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('findOne with relationship', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll with relationship', async () => {
      const findAll = await entity.findAll({
        attributes: fileAttribute,
        include: fileUserInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  }
});
