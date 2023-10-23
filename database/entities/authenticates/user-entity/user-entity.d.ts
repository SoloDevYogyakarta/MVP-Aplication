import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class UserEntity extends BaseEntity {
    username: string;
    email: string;
    phone_number: number;
    password: string;
    file_id: string;
}
export type UserCreationAttribute = Optional<UserEntity, 'id'>;
export interface UserInstance extends Model<UserCreationAttribute, UserEntity>, UserEntity {
}
export declare const userEntity: import("sequelize").ModelCtor<UserInstance>;
