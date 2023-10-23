"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productBasicAssociate = exports.productBasicInclude = exports.productBasicAttribute = void 0;
const stock_entity_1 = require("../../../database/entities/products/stock-entity/stock-entity");
const basic_entity_1 = require("../../../database/entities/products/basic-entity/basic-entity");
const price_entity_1 = require("../../../database/entities/products/price-entity/price-entity");
const join_associate_1 = require("../join-associate/join-associate");
const productBasicAttribute = {
    include: [],
    exclude: [],
};
exports.productBasicAttribute = productBasicAttribute;
const productBasicInclude = [
    {
        model: price_entity_1.productpriceEntity,
        as: 'price',
    },
    {
        model: stock_entity_1.productStockEntity,
        as: 'stock',
    },
    {
        model: join_associate_1.joinProductAndFileAssociate,
        include: join_associate_1.joinProductAndFileInclude,
        as: 'files',
    },
];
exports.productBasicInclude = productBasicInclude;
const options = {
    sourceKey: 'public_id',
    foreignKey: {
        name: 'product_id',
        allowNull: false,
    },
};
basic_entity_1.productBasicEntity.hasOne(price_entity_1.productpriceEntity, { ...options, as: 'price' });
basic_entity_1.productBasicEntity.hasOne(stock_entity_1.productStockEntity, { ...options, as: 'stock' });
basic_entity_1.productBasicEntity.hasMany(join_associate_1.joinProductAndFileAssociate, {
    sourceKey: 'public_id',
    foreignKey: {
        name: 'source_id',
        allowNull: false,
    },
    as: 'files',
});
const productBasicAssociate = basic_entity_1.productBasicEntity;
exports.productBasicAssociate = productBasicAssociate;
//# sourceMappingURL=basic-associate.js.map