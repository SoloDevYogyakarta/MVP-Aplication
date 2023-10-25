import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class ProductPromoEntity extends BaseEntity {
  value: number;
  main_stock: number;
  reverse_stock: number;
  start_time: Date;
  end_time: Date;
  product_id: string;
}

export type ProductPromoCreationAttribute = Optional<ProductPromoEntity, 'id'>;
export interface ProductPromoInstance
  extends Model<ProductPromoCreationAttribute, ProductPromoEntity>,
    ProductPromoEntity {}
export const productPromoEntity = sequelize.define<ProductPromoInstance>(
  'PROMO',
  {
    public_id: DataTypes.STRING,
    main_stock: DataTypes.INTEGER,
    reverse_stock: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    product_id: DataTypes.STRING,
  } as ModelAttributes<ProductPromoInstance>,
  {
    tableName: 'PROMO',
    schema: 'PRODUCTS',
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
