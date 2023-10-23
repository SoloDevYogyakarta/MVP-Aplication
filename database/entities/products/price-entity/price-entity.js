"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productpriceEntity = exports.ProductPriceEntity = void 0;
const nanoid_1 = require("nanoid");
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class ProductPriceEntity extends base_entity_1.BaseEntity {
}
exports.ProductPriceEntity = ProductPriceEntity;
exports.productpriceEntity = entity_1.sequelize.define('PRICE', {
    public_id: sequelize_1.DataTypes.STRING,
    value: sequelize_1.DataTypes.INTEGER,
    currency: sequelize_1.DataTypes.INTEGER,
    product_id: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'PRICE',
    schema: 'PRODUCTS',
    timestamps: false,
    hooks: {
        beforeCreate(attributes, options) {
            const instance = attributes;
            instance.public_id = (0, nanoid_1.nanoid)();
        },
    },
});
//# sourceMappingURL=price-entity.js.map