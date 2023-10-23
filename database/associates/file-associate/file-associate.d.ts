import { FindAttributeOptions, Includeable } from 'sequelize';
declare const fileAttribute: FindAttributeOptions;
declare const fileUserInclude: Includeable[];
declare const fileUserAssociate: import("sequelize").ModelCtor<import("../../../database/entities/commons/file-entity/file-entity").FileInstance>;
export { fileAttribute, fileUserInclude, fileUserAssociate };
