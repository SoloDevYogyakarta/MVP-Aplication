"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStockEntity = exports.ProductStockEntity = void 0;
const nanoid_1 = require("nanoid");
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class ProductStockEntity extends base_entity_1.BaseEntity {
}
exports.ProductStockEntity = ProductStockEntity;
exports.productStockEntity = entity_1.sequelize.define('STOCK', {
    public_id: sequelize_1.DataTypes.STRING,
    use_stock: sequelize_1.DataTypes.BOOLEAN,
    value: sequelize_1.DataTypes.INTEGER,
    stock_wording: sequelize_1.DataTypes.INTEGER,
    product_id: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'STOCK',
    schema: 'PRODUCTS',
    timestamps: false,
    hooks: {
        beforeCreate(attributes, options) {
            const instance = attributes;
            instance.public_id = (0, nanoid_1.nanoid)();
        },
    },
});
//# sourceMappingURL=stock-entity.js.map