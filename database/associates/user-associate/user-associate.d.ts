import { FindAttributeOptions, Includeable } from 'sequelize';
declare const userAttribute: FindAttributeOptions;
declare const userInclude: Includeable[];
declare const userHistoryInclude: Includeable[];
declare const userAssociate: import("sequelize").ModelCtor<import("../../../database/entities/authenticate/user-entity/user-entity").UserInstance>;
export { userAssociate, userAttribute, userInclude, userHistoryInclude };
