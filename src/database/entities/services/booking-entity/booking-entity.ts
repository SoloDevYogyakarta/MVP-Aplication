import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class BookingEntity extends BaseEntity {
  username?: string;
  user_id?: string;
  day: Date;
  desc: string;
}

export type BookingCreationAttribute = Optional<BookingEntity, 'id'>;
export interface BookingInstance
  extends Model<BookingCreationAttribute, BookingEntity>,
    BookingEntity {}
export const bookingEntity = sequelize.define<BookingInstance>(
  'BOOKING',
  {
    public_id: DataTypes.STRING,
    username: DataTypes.STRING,
    user_id: DataTypes.STRING,
    day: DataTypes.DATE,
    desc: DataTypes.TEXT,
  } as ModelAttributes<BookingInstance>,
  {
    tableName: 'BOOKING',
    schema: 'SERVICES',
  },
);
