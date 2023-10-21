import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class ProductBasicEntity extends BaseEntity {
  mechanis_name: string;
  desc: string;
}

export type ProductBasicCreationAttribute = Optional<ProductBasicEntity, 'id'>;
export interface ProductBasicInstance
  extends Model<ProductBasicCreationAttribute, ProductBasicEntity>,
    ProductBasicEntity {}
export const productBasicEntity = sequelize.define<ProductBasicInstance>(
  'BASIC',
  {
    public_id: DataTypes.STRING,
    mechanis_name: DataTypes.STRING,
    desc: DataTypes.STRING,
  } as ModelAttributes<ProductBasicInstance>,
  {
    tableName: 'BASIC',
    schema: 'PRODUCTS',
    timestamps: false,
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
