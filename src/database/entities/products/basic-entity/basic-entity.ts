import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class ProductBasicEntity extends BaseEntity {
  name?: string;
  status?: number;
  condition?: number;
  shortdesc?: string;
  main_stock?: number;
  reserve_stock?: number;
  user_id?: string;
}

export type ProductBasicCreationAttribute = Optional<ProductBasicEntity, 'id'>;
export interface ProductBasicInstance
  extends Model<ProductBasicCreationAttribute, ProductBasicEntity>,
    ProductBasicEntity {}
export const productBasicEntity = sequelize.define<ProductBasicInstance>(
  'BASIC',
  {
    public_id: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    condition: DataTypes.INTEGER,
    shortdesc: DataTypes.STRING,
    main_stock: DataTypes.INTEGER,
    reserve_stock: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
  } as ModelAttributes<ProductBasicInstance>,
  {
    tableName: 'BASIC',
    schema: 'PRODUCTS',
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
