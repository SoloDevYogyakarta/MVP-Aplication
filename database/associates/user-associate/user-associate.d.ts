import { FindAttributeOptions, Includeable } from 'sequelize';
declare const userAttribute: FindAttributeOptions;
declare const userInclude: Includeable[];
declare const userAssociate: import("sequelize").ModelCtor<import("../../../database/entities/authenticates/user-entity/user-entity").UserInstance>;
export { userAttribute, userInclude, userAssociate };
