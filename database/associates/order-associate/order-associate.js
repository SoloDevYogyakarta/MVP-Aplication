"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderInclude = exports.orderAttribute = exports.orderAssociate = void 0;
const files_entity_1 = require("../../../database/entities/services/files-entity/files-entity");
const history_entity_1 = require("../../../database/entities/services/history-entity/history-entity");
const order_entity_1 = require("../../../database/entities/services/order-entity/order-entity");
const orderAttribute = {
    include: [
        ['createdAt', 'created_at'],
        ['updatedAt', 'updated_at'],
    ],
    exclude: ['createdAt', 'updatedAt'],
};
exports.orderAttribute = orderAttribute;
const orderInclude = [
    {
        model: history_entity_1.historyEntity,
        attributes: {
            include: [
                ['createdAt', 'created_at'],
                ['updatedAt', 'updated_at'],
            ],
            exclude: ['order_id', 'createdAt', 'updatedAt'],
        },
        as: 'history',
    },
    {
        model: files_entity_1.fileEntity,
        attributes: {
            include: [],
            exclude: [],
        },
        as: 'files',
    },
];
exports.orderInclude = orderInclude;
order_entity_1.orderEntity.hasMany(history_entity_1.historyEntity, {
    sourceKey: 'id',
    foreignKey: { name: 'order_id', allowNull: true },
    as: 'history',
});
order_entity_1.orderEntity.hasMany(files_entity_1.fileEntity, {
    sourceKey: 'id',
    foreignKey: { name: 'order_id', allowNull: true },
    as: 'files',
});
const orderAssociate = order_entity_1.orderEntity;
exports.orderAssociate = orderAssociate;
//# sourceMappingURL=order-associate.js.map