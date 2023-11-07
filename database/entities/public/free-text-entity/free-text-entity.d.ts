import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class FreeTextEntity extends BaseEntity {
    text: string;
    sparepart_id: number;
}
export type FreeTextCreationAttribute = Optional<FreeTextEntity, 'id'>;
export interface FreeTextInstance extends Model<FreeTextCreationAttribute, FreeTextEntity>, FreeTextEntity {
}
export declare const freeTextEntity: import("sequelize").ModelCtor<FreeTextInstance>;
