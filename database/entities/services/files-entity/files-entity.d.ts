import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class FileEntity extends BaseEntity {
    originalname: string;
    filepath: string;
    type: string;
    desc: string;
    browse: string;
    order_id: number;
}
export type FileCreationAttribute = Optional<FileEntity, 'id'>;
export interface FileInstance extends Model<FileCreationAttribute, FileEntity>, FileEntity {
}
export declare const fileEntity: import("sequelize").ModelCtor<FileInstance>;
