"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHistoryEntity = exports.UserHistoryEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class UserHistoryEntity extends base_entity_1.BaseEntity {
}
exports.UserHistoryEntity = UserHistoryEntity;
exports.userHistoryEntity = entity_1.sequelize.define('HISTORY', {
    plat_number: sequelize_1.DataTypes.STRING,
    phone_number: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING,
    user_id: sequelize_1.DataTypes.INTEGER,
}, {
    tableName: 'HISTORY',
    schema: 'AUTHENTICATE',
    timestamps: false,
});
//# sourceMappingURL=history-entity.js.map