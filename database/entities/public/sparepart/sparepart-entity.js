"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sparepartEntity = exports.SparepartEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class SparepartEntity extends base_entity_1.BaseEntity {
}
exports.SparepartEntity = SparepartEntity;
exports.sparepartEntity = entity_1.sequelize.define('SPAREPART', {
    public_id: sequelize_1.DataTypes.STRING,
    text: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'SPAREPART',
    schema: 'public',
    timestamps: false,
});
//# sourceMappingURL=sparepart-entity.js.map