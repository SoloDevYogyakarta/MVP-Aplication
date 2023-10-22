import { ModelCtor } from 'sequelize';
import {
  fileEntity,
  FileInstance,
} from '../../../database/entities/commons/file-entity/file-entity';
import { getField } from '../../../utils/get-field/get-field';
import { fileAttribute, fileUserInclude } from './file-associate';

describe('fileAssociate', () => {
  let file_user_entity: ModelCtor<FileInstance>;

  beforeEach(() => {
    file_user_entity = fileEntity;
  });

  it('should to be defined', () => expect(file_user_entity).toBeDefined());

  it('render correctly', () => expect(file_user_entity).toMatchSnapshot());

  try {
    it('findOne with relationship user', async () => {
      const { public_id } = getField('file-entity');
      const findOne = await file_user_entity.findOne({
        where: { public_id },
        attributes: fileAttribute,
        include: fileUserInclude,
      });
      expect(findOne.public_id).toEqual(public_id);
    });

    it('findAll with relationship user', async () => {
      const findAll = await file_user_entity.findAll({
        attributes: fileAttribute,
        include: fileUserInclude,
      });
      expect(findAll.length).not.toEqual(0);
    });
  } catch (err) {
    // empty
  }
});
