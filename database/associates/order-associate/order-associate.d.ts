import { FindAttributeOptions, Includeable } from 'sequelize';
declare const orderAttribute: FindAttributeOptions;
declare const orderInclude: Includeable[];
declare const orderAssociate: import("sequelize").ModelCtor<import("../../../database/entities/services/order-entity/order-entity").OrderInstance>;
export { orderAssociate, orderAttribute, orderInclude };
