import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class ProductStockEntity extends BaseEntity {
  use_stock?: boolean;
  value?: number;
  stock_wording?: number;
  product_id?: string;
}

export type ProductStockCreationAttribute = Optional<ProductStockEntity, 'id'>;
export interface ProductStockInstance
  extends Model<ProductStockCreationAttribute, ProductStockEntity>,
    ProductStockEntity {}
export const productStockEntity = sequelize.define<ProductStockInstance>(
  'STOCK',
  {
    public_id: DataTypes.STRING,
    use_stock: DataTypes.BOOLEAN,
    value: DataTypes.INTEGER,
    stock_wording: DataTypes.INTEGER,
    product_id: DataTypes.STRING,
  } as ModelAttributes<ProductStockInstance>,
  {
    tableName: 'STOCK',
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
