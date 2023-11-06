import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class BookingEntity extends BaseEntity {
  name: string;
  title: string;
  desc: string;
  user_id: number;
  date: Date;
  time: string;
}

export type BookingCreationAttribute = Optional<BookingEntity, 'id'>;
export interface BookingInstance
  extends Model<BookingCreationAttribute, BookingEntity>,
    BookingEntity {}
export const bookingEntity = sequelize.define<BookingInstance>(
  'BOOKING',
  {
    name: DataTypes.STRING,
    title: DataTypes.TEXT,
    desc: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
  } as ModelAttributes<BookingInstance>,
  {
    tableName: 'BOOKING',
    schema: 'SERVICES',
  },
);
