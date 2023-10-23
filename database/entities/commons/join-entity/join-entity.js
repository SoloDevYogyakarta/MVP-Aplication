"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinEntity = exports.JoinEntity = void 0;
const nanoid_1 = require("nanoid");
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class JoinEntity extends base_entity_1.BaseEntity {
}
exports.JoinEntity = JoinEntity;
exports.joinEntity = entity_1.sequelize.define('JOIN', {
    public_id: sequelize_1.DataTypes.STRING,
    source_id: sequelize_1.DataTypes.STRING,
    foreign_id: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'JOIN',
    schema: 'COMMONS',
    timestamps: false,
    hooks: {
        beforeCreate(attributes, options) {
            const instance = attributes;
            instance.public_id = (0, nanoid_1.nanoid)();
        },
    },
});
//# sourceMappingURL=join-entity.js.map