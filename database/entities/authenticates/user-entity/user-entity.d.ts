import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class UserEntity extends BaseEntity {
    full_name: string;
    plat_number: string;
    phone_number: string;
    motor: string;
    year_production: number;
    address: string;
    password: string;
    role: string;
    file_id: string;
}
export type UserCreationAttribute = Optional<UserEntity, 'id'>;
export interface UserInstance extends Model<UserCreationAttribute, UserEntity>, UserEntity {
}
export declare const userEntity: import("sequelize").ModelCtor<UserInstance>;
