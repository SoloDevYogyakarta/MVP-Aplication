import { faker } from '@faker-js/faker';
import { ModelCtor } from 'sequelize';
import { createpath } from '../../../../utils/system/system';
import { getField } from '../../../../utils/get-field/get-field';
import { productpriceEntity } from '../price-entity/price-entity';
import { productStockEntity } from '../stock-entity/stock-entity';
import { productBasicEntity, ProductBasicInstance } from './basic-entity';
import { fileEntity } from '../../commons/file-entity/file-entity';
import { joinEntity } from '../../commons/join-entity/join-entity';

const images = [
  {
    fieldname: 'file',
    originalname: '391282393_7054748857952078_2554999196306250130_n.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: '/Users/kenedy-/mvpapplication/mvpapplication/src/assets',
    filename: 'v2EFO-prv1RXb3dU20H8o.jpeg',
    path: '/Users/kenedy-/mvpapplication/mvpapplication/src/assets/v2EFO-prv1RXb3dU20H8o.jpeg',
    size: 409192,
  },
];

describe('ProductBasicEntity', () => {
  let public_id!: string;
  let user_id!: string;
  let entity: ModelCtor<ProductBasicInstance>;

  beforeEach(() => {
    entity = productBasicEntity;
  });

  it('should to be defined', () => expect(entity).toBeDefined());

  it('render correctly', () => expect(entity).toMatchSnapshot());

  try {
    user_id = getField('user-http-entity').public_id;
    public_id = getField('basic-http-entity').public_id;
  } catch (err) {
    // empty
  }

  if (user_id) {
    it('create', async () => {
      const name = faker.commerce.productName();

      const basic = await entity.create({
        name,
        status: faker.helpers.arrayElement([1, 2]),
        condition: faker.helpers.arrayElement([-2, -1, 0, 1, 2]),
        shortdesc: faker.lorem.paragraph(),
        main_stock: faker.helpers.arrayElement([1, 2]),
        reserve_stock: faker.helpers.arrayElement([1, 2]),
        user_id,
      });
      basic.save();
      const price = await productpriceEntity.create({
        value: faker.number.int({ min: 1000, max: 150000 }),
        currency: faker.number.int({ min: 100, max: 50000 }),
        product_id: basic.public_id,
      });
      price.save();
      const stock = await productStockEntity.create({
        value: faker.number.int({ min: 100, max: 5000 }),
        stock_wording: faker.number.int({ min: 10, max: 50000 }),
        product_id: basic.public_id,
      });
      stock.save();
      for (const file of images) {
        const f = await fileEntity.create({
          originalname: file.originalname,
          filepath: file.path.split('/src')[1],
          filename: file.filename,
          type: file.mimetype.split('/')[1],
        });
        f.save();
        const j = await joinEntity.create({
          source_id: basic.public_id,
          foreign_id: f.public_id,
        });
        j.save();
      }
      createpath('../../database/dataTxt/basic-entity.txt', basic);
      expect(basic.name).toEqual(name);
    });
  }

  if (public_id) {
    it('update', async () => {
      const findOne = await entity.findOne({ where: { public_id } });
      const name = faker.commerce.productName();
      findOne.name = name;
      findOne.status = faker.helpers.arrayElement([1, 2]);
      findOne.condition = faker.helpers.arrayElement([-2, -1, 0, 1, 2]);
      findOne.main_stock = faker.helpers.arrayElement([1, 2]);
      findOne.reserve_stock = faker.helpers.arrayElement([1, 2]);
      findOne.save();
      expect(findOne.name).toEqual(name);
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
