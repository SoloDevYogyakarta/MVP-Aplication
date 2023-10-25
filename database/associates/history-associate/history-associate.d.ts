import { FindAttributeOptions, Includeable } from 'sequelize';
declare const historyAttribute: FindAttributeOptions;
declare const historyInclude: Includeable[];
declare const historyAssociate: import("sequelize").ModelCtor<import("../../../database/entities/services/history-entity/history-entity").HistoryInstance>;
export { historyAttribute, historyInclude, historyAssociate };
