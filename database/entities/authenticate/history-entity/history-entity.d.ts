import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class UserHistoryEntity extends BaseEntity {
    plat_number: string;
    phone_number: string;
    name: string;
    address: string;
    user_id: number;
}
export type UserHistoryCreationAttribute = Optional<UserHistoryEntity, 'id'>;
export interface UserHistoryInstance extends Model<UserHistoryCreationAttribute, UserHistoryEntity>, UserHistoryEntity {
}
export declare const userHistoryEntity: import("sequelize").ModelCtor<UserHistoryInstance>;
