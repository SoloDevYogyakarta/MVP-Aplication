"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productBasicEntity = exports.ProductBasicEntity = void 0;
const nanoid_1 = require("nanoid");
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class ProductBasicEntity extends base_entity_1.BaseEntity {
}
exports.ProductBasicEntity = ProductBasicEntity;
exports.productBasicEntity = entity_1.sequelize.define('BASIC', {
    public_id: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    status: sequelize_1.DataTypes.INTEGER,
    condition: sequelize_1.DataTypes.INTEGER,
    shortdesc: sequelize_1.DataTypes.STRING,
    main_stock: sequelize_1.DataTypes.INTEGER,
    reserve_stock: sequelize_1.DataTypes.INTEGER,
    user_id: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'BASIC',
    schema: 'PRODUCTS',
    hooks: {
        beforeCreate(attributes, options) {
            const instance = attributes;
            instance.public_id = (0, nanoid_1.nanoid)();
        },
    },
});
//# sourceMappingURL=basic-entity.js.map