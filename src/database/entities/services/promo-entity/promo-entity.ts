import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class PromoEntity extends BaseEntity {
  name: string;
  desc: string;
  image: string;
  price: number;
  discount: number;
  start_time: Date;
  end_time: Date;
  user_id: number;
}

export type PromoCreationAttribute = Optional<PromoEntity, 'id'>;
export interface PromoInstance
  extends Model<PromoCreationAttribute, PromoEntity>,
    PromoEntity {}
export const promoEntity = sequelize.define<PromoInstance>(
  'PROMO',
  {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    user_id: DataTypes.STRING,
  } as ModelAttributes<PromoInstance>,
  {
    tableName: 'PROMO',
    schema: 'SERVICES',
  },
);
