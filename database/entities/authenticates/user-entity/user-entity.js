"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = exports.UserEntity = void 0;
const sequelize_1 = require("sequelize");
const nanoid_1 = require("nanoid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const entity_1 = require("../../entity");
const base_entity_1 = require("../../base-entity/base-entity");
class UserEntity extends base_entity_1.BaseEntity {
}
exports.UserEntity = UserEntity;
exports.userEntity = entity_1.sequelize.define('USER', {
    public_id: sequelize_1.DataTypes.STRING,
    username: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    phone_number: sequelize_1.DataTypes.INTEGER,
    password: sequelize_1.DataTypes.STRING,
    file_id: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'USER',
    schema: 'AUTHENTICATE',
    hooks: {
        beforeCreate(attributes, options) {
            const instance = attributes;
            instance.public_id = (0, nanoid_1.nanoid)();
            instance.password = bcrypt_1.default.hashSync(instance.password, 10);
        },
    },
});
//# sourceMappingURL=user-entity.js.map