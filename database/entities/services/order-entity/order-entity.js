"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderEntity = exports.OrderEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class OrderEntity extends base_entity_1.BaseEntity {
}
exports.OrderEntity = OrderEntity;
exports.orderEntity = entity_1.sequelize.define('ORDER', {
    name: sequelize_1.DataTypes.STRING,
    desc: sequelize_1.DataTypes.TEXT,
    user_id: sequelize_1.DataTypes.INTEGER,
    createdAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: 'ORDER',
    schema: 'PRODUCTS',
});
//# sourceMappingURL=order-entity.js.map