"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyEntity = exports.HistoryEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class HistoryEntity extends base_entity_1.BaseEntity {
}
exports.HistoryEntity = HistoryEntity;
exports.historyEntity = entity_1.sequelize.define('HISTORY', {
    name: sequelize_1.DataTypes.STRING,
    title: sequelize_1.DataTypes.STRING,
    desc: sequelize_1.DataTypes.STRING,
    price: sequelize_1.DataTypes.INTEGER,
    order_id: sequelize_1.DataTypes.INTEGER,
}, {
    tableName: 'HISTORY',
    schema: 'SERVICES',
});
//# sourceMappingURL=history-entity.js.map