import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class JoinEntity extends BaseEntity {
    source_id: string;
    foreign_id: string;
}
export type JoinCreationAttribute = Optional<JoinEntity, 'id'>;
export interface JoinInstance extends Model<JoinCreationAttribute, JoinEntity>, JoinEntity {
}
export declare const joinEntity: import("sequelize").ModelCtor<JoinInstance>;
