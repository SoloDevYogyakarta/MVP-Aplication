"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinProductAndFileAssociate = exports.joinProductAndFileInclude = exports.joinProductAndFileAttribute = void 0;
const file_entity_1 = require("../../../database/entities/commons/file-entity/file-entity");
const join_entity_1 = require("../../../database/entities/commons/join-entity/join-entity");
exports.joinProductAndFileAttribute = {
    include: [],
    exclude: [],
};
exports.joinProductAndFileInclude = [
    {
        model: file_entity_1.fileEntity,
        as: 'file',
    },
];
const productAndFileAssociate = join_entity_1.joinEntity;
productAndFileAssociate.hasOne(file_entity_1.fileEntity, {
    sourceKey: 'foreign_id',
    foreignKey: {
        name: 'public_id',
        allowNull: false,
    },
    as: 'file',
});
exports.joinProductAndFileAssociate = productAndFileAssociate;
//# sourceMappingURL=join-associate.js.map