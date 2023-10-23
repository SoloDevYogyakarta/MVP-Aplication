"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUserAssociate = exports.fileUserInclude = exports.fileAttribute = void 0;
const user_entity_1 = require("../../../database/entities/authenticates/user-entity/user-entity");
const file_entity_1 = require("../../../database/entities/commons/file-entity/file-entity");
const fileAttribute = {
    include: [],
    exclude: [],
};
exports.fileAttribute = fileAttribute;
const fileUserInclude = [
    {
        model: user_entity_1.userEntity,
        as: 'user',
    },
];
exports.fileUserInclude = fileUserInclude;
const options = {
    sourceKey: 'public_id',
    foreignKey: {
        name: 'file_id',
        allowNull: true,
    },
};
file_entity_1.fileEntity.hasOne(user_entity_1.userEntity, { ...options, as: 'user' });
const fileUserAssociate = file_entity_1.fileEntity;
exports.fileUserAssociate = fileUserAssociate;
//# sourceMappingURL=file-associate.js.map