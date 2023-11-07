import { FindAttributeOptions, Includeable } from 'sequelize';
declare const sparepartAttribute: FindAttributeOptions;
declare const sparepartInclude: Includeable[];
declare const sparepartAssociate: import("sequelize").ModelCtor<import("../../../database/entities/services/sparepart-entity/sparepart-entity").SparepartInstance>;
export { sparepartAttribute, sparepartInclude, sparepartAssociate };
