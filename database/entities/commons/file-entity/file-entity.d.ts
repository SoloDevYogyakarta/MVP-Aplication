import { Model, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
export declare class FileEntity extends BaseEntity {
    filename: string;
    originalname: string;
    filepath: string;
    type: string;
    width: number;
    height: number;
}
export type FileCreationAttribute = Optional<FileEntity, 'id'>;
export interface FileInstance extends Model<FileCreationAttribute, FileEntity>, FileEntity {
}
export declare const fileEntity: import("sequelize").ModelCtor<FileInstance>;
