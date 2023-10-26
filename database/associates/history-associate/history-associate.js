"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyAssociate = exports.historyInclude = exports.historyAttribute = void 0;
const join_entity_1 = require("../../../database/entities/commons/join-entity/join-entity");
const history_entity_1 = require("../../../database/entities/services/history-entity/history-entity");
const basic_associate_1 = require("../basic-associate/basic-associate");
const joinProductInclude = [
    {
        model: basic_associate_1.productBasicAssociate,
        include: basic_associate_1.productBasicInclude,
        as: 'product',
    },
];
join_entity_1.joinEntity.hasOne(basic_associate_1.productBasicAssociate, {
    sourceKey: 'foreign_id',
    foreignKey: {
        name: 'public_id',
        allowNull: false,
    },
    as: 'product',
});
const historyAttribute = {
    include: [],
    exclude: [],
};
exports.historyAttribute = historyAttribute;
const historyInclude = [
    {
        model: join_entity_1.joinEntity,
        as: 'products',
        include: joinProductInclude,
    },
];
exports.historyInclude = historyInclude;
history_entity_1.historyEntity.hasMany(join_entity_1.joinEntity, {
    sourceKey: 'public_id',
    foreignKey: {
        name: 'source_id',
        allowNull: false,
    },
    as: 'products',
});
const historyAssociate = history_entity_1.historyEntity;
exports.historyAssociate = historyAssociate;
//# sourceMappingURL=history-associate.js.map