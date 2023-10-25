import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class HistoryEntity extends BaseEntity {
    name: string;
    desc: string;
    user_id: string;
}
export type HistoryCreationAttribute = Optional<HistoryEntity, 'id'>;
export interface HistoryInstance extends Model<HistoryCreationAttribute, HistoryEntity>, HistoryEntity {
}
export declare const historyEntity: import("sequelize").ModelCtor<HistoryInstance>;
