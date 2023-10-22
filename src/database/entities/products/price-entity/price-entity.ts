import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class ProductPriceEntity extends BaseEntity {
  value?: number;
  currency?: number;
  product_id?: string;
}

export type ProductPriceCreationAttribute = Optional<ProductPriceEntity, 'id'>;

export interface ProductPriceInstance
  extends Model<ProductPriceCreationAttribute, ProductPriceEntity>,
    ProductPriceEntity {}

export const productpriceEntity = sequelize.define<ProductPriceInstance>(
  'PRICE',
  {
    public_id: DataTypes.STRING,
    value: DataTypes.INTEGER,
    currency: DataTypes.INTEGER,
    product_id: DataTypes.STRING,
  } as ModelAttributes<ProductPriceInstance>,
  {
    tableName: 'PRICE',
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
