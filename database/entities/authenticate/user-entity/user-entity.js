"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = exports.UserEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class UserEntity extends base_entity_1.BaseEntity {
}
exports.UserEntity = UserEntity;
exports.userEntity = entity_1.sequelize.define('USER', {
    plat_number: sequelize_1.DataTypes.STRING,
    phone_number: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    motor: sequelize_1.DataTypes.STRING,
    year_production: sequelize_1.DataTypes.INTEGER,
    address: sequelize_1.DataTypes.STRING,
    role: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'USER',
    schema: 'AUTHENTICATE',
});
//# sourceMappingURL=user-entity.js.map