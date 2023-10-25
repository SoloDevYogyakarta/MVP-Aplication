"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinFileAssociate = exports.joinFileInclude = exports.joinFileAttribute = void 0;
const file_entity_1 = require("../../../database/entities/commons/file-entity/file-entity");
const join_entity_1 = require("../../../database/entities/commons/join-entity/join-entity");
exports.joinFileAttribute = {
    include: [],
    exclude: [],
};
exports.joinFileInclude = [
    {
        model: file_entity_1.fileEntity,
        as: 'file',
    },
];
const joinFileEntity = join_entity_1.joinEntity;
joinFileEntity.hasOne(file_entity_1.fileEntity, {
    sourceKey: 'foreign_id',
    foreignKey: {
        name: 'public_id',
        allowNull: false,
    },
    as: 'file',
});
exports.joinFileAssociate = joinFileEntity;
//# sourceMappingURL=join-associate.js.map