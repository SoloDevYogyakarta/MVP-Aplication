"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHistoryInclude = exports.userInclude = exports.userAttribute = exports.userAssociate = void 0;
const history_entity_1 = require("../../../database/entities/authenticate/history-entity/history-entity");
const user_entity_1 = require("../../../database/entities/authenticate/user-entity/user-entity");
const order_associate_1 = require("../order-associate/order-associate");
const userAttribute = {
    include: [
        ['createdAt', 'created_at'],
        ['updatedAt', 'updated_at'],
    ],
    exclude: ['password', 'createdAt', 'updatedAt'],
};
exports.userAttribute = userAttribute;
const userInclude = [
    {
        model: history_entity_1.userHistoryEntity,
        attributes: {
            include: [['updatedAt', 'updated_at']],
            exclude: [],
        },
        as: 'activities',
    },
];
exports.userInclude = userInclude;
const userHistoryInclude = [
    {
        model: order_associate_1.orderAssociate,
        attributes: order_associate_1.orderAttribute,
        include: order_associate_1.orderInclude,
        as: 'order',
    },
];
exports.userHistoryInclude = userHistoryInclude;
user_entity_1.userEntity.hasMany(history_entity_1.userHistoryEntity, {
    sourceKey: 'id',
    foreignKey: { name: 'user_id', allowNull: true },
    as: 'activities',
});
user_entity_1.userEntity.hasMany(order_associate_1.orderAssociate, {
    sourceKey: 'id',
    foreignKey: { name: 'user_id', allowNull: true },
    as: 'order',
});
const userAssociate = user_entity_1.userEntity;
exports.userAssociate = userAssociate;
//# sourceMappingURL=user-associate.js.map