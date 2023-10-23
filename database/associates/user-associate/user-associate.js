"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAssociate = exports.userInclude = exports.userAttribute = void 0;
const user_entity_1 = require("../../../database/entities/authenticates/user-entity/user-entity");
const file_associate_1 = require("../file-associate/file-associate");
const userAttribute = {
    include: [],
    exclude: [],
};
exports.userAttribute = userAttribute;
const userInclude = [
    {
        model: file_associate_1.fileUserAssociate,
        as: 'file',
    },
];
exports.userInclude = userInclude;
user_entity_1.userEntity.belongsTo(file_associate_1.fileUserAssociate, {
    targetKey: 'public_id',
    foreignKey: {
        name: 'file_id',
    },
    as: 'file',
});
const userAssociate = user_entity_1.userEntity;
exports.userAssociate = userAssociate;
//# sourceMappingURL=user-associate.js.map