import { FindAttributeOptions, Includeable } from 'sequelize';
declare const productPromoAttribute: FindAttributeOptions;
declare const productPromoInclude: Includeable[];
declare const productPromoAssciate: import("sequelize").ModelCtor<import("../../../database/entities/products/promo-entity/promo-entity").ProductPromoInstance>;
export { productPromoAttribute, productPromoInclude, productPromoAssciate };
