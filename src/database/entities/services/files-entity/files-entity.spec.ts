import { ModelCtor } from 'sequelize';
import { fileEntity, FileInstance } from './files-entity';

describe('FileEntity', () => {
  let entity: ModelCtor<FileInstance>;

  beforeEach(() => {
    entity = fileEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());
});
