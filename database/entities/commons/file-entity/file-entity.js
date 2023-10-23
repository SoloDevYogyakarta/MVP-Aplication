"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileEntity = exports.FileEntity = void 0;
const nanoid_1 = require("nanoid");
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class FileEntity extends base_entity_1.BaseEntity {
}
exports.FileEntity = FileEntity;
exports.fileEntity = entity_1.sequelize.define('FILE', {
    public_id: sequelize_1.DataTypes.STRING,
    filename: sequelize_1.DataTypes.STRING,
    originalname: sequelize_1.DataTypes.STRING,
    filepath: sequelize_1.DataTypes.STRING,
    type: sequelize_1.DataTypes.STRING,
    width: sequelize_1.DataTypes.INTEGER,
    height: sequelize_1.DataTypes.INTEGER,
}, {
    tableName: 'FILE',
    schema: 'COMMONS',
    timestamps: false,
    hooks: {
        beforeCreate(attributes, options) {
            const instance = attributes;
            instance.public_id = (0, nanoid_1.nanoid)();
        },
    },
});
//# sourceMappingURL=file-entity.js.map