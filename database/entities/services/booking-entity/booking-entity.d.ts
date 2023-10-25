import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class BookingEntity extends BaseEntity {
    username?: string;
    user_id?: string;
    day: Date;
    desc: string;
}
export type BookingCreationAttribute = Optional<BookingEntity, 'id'>;
export interface BookingInstance extends Model<BookingCreationAttribute, BookingEntity>, BookingEntity {
}
export declare const bookingEntity: import("sequelize").ModelCtor<BookingInstance>;
