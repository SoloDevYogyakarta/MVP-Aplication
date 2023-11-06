import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class UserEntity extends BaseEntity {
    plat_number: string;
    phone_number: string;
    name: string;
    motor: string;
    year_production: number;
    address: string;
    role: string;
    is_active: boolean;
    password: string;
}
export type UserCreationAttribute = Optional<UserEntity, 'id'>;
export interface UserInstance extends Model<UserCreationAttribute, UserEntity>, UserEntity {
}
export declare const userEntity: import("sequelize").ModelCtor<UserInstance>;
