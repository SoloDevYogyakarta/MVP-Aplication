"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPromoAssciate = exports.productPromoInclude = exports.productPromoAttribute = void 0;
const promo_entity_1 = require("../../../database/entities/products/promo-entity/promo-entity");
const basic_associate_1 = require("../basic-associate/basic-associate");
const productPromoAttribute = {
    include: [],
    exclude: [],
};
exports.productPromoAttribute = productPromoAttribute;
const productPromoInclude = [
    {
        model: basic_associate_1.productBasicAssociate,
        as: 'product',
    },
];
exports.productPromoInclude = productPromoInclude;
promo_entity_1.productPromoEntity.hasOne(basic_associate_1.productBasicAssociate, {
    sourceKey: 'product_id',
    foreignKey: {
        name: 'public_id',
        allowNull: false,
    },
    as: 'product',
});
const productPromoAssciate = promo_entity_1.productPromoEntity;
exports.productPromoAssciate = productPromoAssciate;
//# sourceMappingURL=promo-associate.js.map