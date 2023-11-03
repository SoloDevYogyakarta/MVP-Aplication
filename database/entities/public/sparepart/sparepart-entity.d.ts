import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class SparepartEntity extends BaseEntity {
    text: string;
}
export type SparepartCreationAttribute = Optional<SparepartEntity, 'id'>;
export interface SparepartInstance extends Model<SparepartCreationAttribute, SparepartEntity>, SparepartEntity {
}
export declare const sparepartEntity: import("sequelize").ModelCtor<SparepartInstance>;
