import { FindAttributeOptions, Includeable } from 'sequelize';
declare const productBasicAttribute: FindAttributeOptions;
declare const productBasicInclude: Includeable[];
declare const productBasicAssociate: import("sequelize").ModelCtor<import("../../../database/entities/products/basic-entity/basic-entity").ProductBasicInstance>;
export { productBasicAttribute, productBasicInclude, productBasicAssociate };
