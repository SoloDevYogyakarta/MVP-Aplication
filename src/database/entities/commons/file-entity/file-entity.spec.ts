import { ModelCtor } from 'sequelize';
import { getField } from '../../../../utils/get-field/get-field';
import { fileEntity, FileInstance } from './file-entity';

const image = {
  fieldname: 'file',
  originalname: '391282393_7054748857952078_2554999196306250130_n.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: '/Users/kenedy-/mvpapplication/mvpapplication/src/assets',
  filename: '6muLn08-89ryTPSsLe0Nc.jpeg',
  path: '/Users/kenedy-/mvpapplication/mvpapplication/src/assets/6muLn08-89ryTPSsLe0Nc.jpeg',
};

describe('FileEntity', () => {
  let public_id!: string;
  let entity: ModelCtor<FileInstance>;

  beforeEach(() => {
    entity = fileEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    public_id = getField('file-entity').public_id;
  } catch (err) {
    // empty
  }

  if (public_id) {
    it('udpate', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      findOne.originalname = image.originalname;
      findOne.filename = image.filename;
      findOne.filepath = image.path.split('/src')[1];
      findOne.save();
      expect(findOne.filename).toEqual(image.filename);
    });

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
