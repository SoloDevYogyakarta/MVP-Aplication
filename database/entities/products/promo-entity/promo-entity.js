"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPromoEntity = exports.ProductPromoEntity = void 0;
const nanoid_1 = require("nanoid");
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class ProductPromoEntity extends base_entity_1.BaseEntity {
}
exports.ProductPromoEntity = ProductPromoEntity;
exports.productPromoEntity = entity_1.sequelize.define('PROMO', {
    public_id: sequelize_1.DataTypes.STRING,
    main_stock: sequelize_1.DataTypes.INTEGER,
    reverse_stock: sequelize_1.DataTypes.INTEGER,
    value: sequelize_1.DataTypes.INTEGER,
    start_time: sequelize_1.DataTypes.DATE,
    end_time: sequelize_1.DataTypes.DATE,
    product_id: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'PROMO',
    schema: 'PRODUCTS',
    hooks: {
        beforeCreate(attributes, options) {
            const instance = attributes;
            instance.public_id = (0, nanoid_1.nanoid)();
        },
    },
});
//# sourceMappingURL=promo-entity.js.map