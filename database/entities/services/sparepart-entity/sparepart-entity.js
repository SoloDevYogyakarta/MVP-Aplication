"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sparepartEntity = exports.SparepartEntity = void 0;
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class SparepartEntity extends base_entity_1.BaseEntity {
}
exports.SparepartEntity = SparepartEntity;
exports.sparepartEntity = entity_1.sequelize.define('SPAREPART', {}, {
    tableName: 'SPAREPART',
    schema: 'SERVICES',
});
//# sourceMappingURL=sparepart-entity.js.map