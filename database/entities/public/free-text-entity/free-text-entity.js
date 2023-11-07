"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freeTextEntity = exports.FreeTextEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class FreeTextEntity extends base_entity_1.BaseEntity {
}
exports.FreeTextEntity = FreeTextEntity;
exports.freeTextEntity = entity_1.sequelize.define('TEXT', {
    text: sequelize_1.DataTypes.TEXT,
    sparepart_id: sequelize_1.DataTypes.INTEGER,
}, {
    tableName: 'TEXT',
    schema: 'public',
});
//# sourceMappingURL=free-text-entity.js.map