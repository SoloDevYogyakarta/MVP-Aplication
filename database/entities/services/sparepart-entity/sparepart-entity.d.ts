import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class SparepartEntity extends BaseEntity {
}
export type SparePartCreationAttribute = Optional<SparepartEntity, 'id'>;
export interface SparepartInstance extends Model<SparePartCreationAttribute, SparepartEntity>, SparepartEntity {
}
export declare const sparepartEntity: import("sequelize").ModelCtor<SparepartInstance>;
