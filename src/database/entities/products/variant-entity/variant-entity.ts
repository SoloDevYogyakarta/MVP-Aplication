import { nanoid } from 'nanoid';
import {
  DataTypes,
  Model,
  ModelAttributes,
  Optional,
  Sequelize,
} from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class VariantEntity extends BaseEntity {
  name: string;
  type: string;
  desc: string;
  product_id: string;
}

export type VariantCreationAttribute = Optional<VariantEntity, 'id'>;
export interface VariantInstance
  extends Model<VariantCreationAttribute, VariantEntity>,
    VariantEntity {}
export const variantEntity = sequelize.define<VariantInstance>(
  'VARIANT',
  {
    public_id: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    desc: DataTypes.STRING,
    product_id: DataTypes.STRING,
  } as ModelAttributes<VariantInstance>,
  {
    tableName: 'VARIANT',
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
