"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileEntity = exports.FileEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class FileEntity extends base_entity_1.BaseEntity {
}
exports.FileEntity = FileEntity;
exports.fileEntity = entity_1.sequelize.define('FILES', {
    originalname: sequelize_1.DataTypes.STRING,
    filepath: sequelize_1.DataTypes.STRING,
    type: sequelize_1.DataTypes.STRING,
    order_id: sequelize_1.DataTypes.INTEGER,
}, {
    tableName: 'FILES',
    schema: 'PRODUCTS',
    timestamps: false,
});
//# sourceMappingURL=files-entity.js.map