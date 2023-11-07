"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sparepartAssociate = exports.sparepartInclude = exports.sparepartAttribute = void 0;
const free_text_entity_1 = require("../../../database/entities/public/free-text-entity/free-text-entity");
const sparepart_entity_1 = require("../../../database/entities/services/sparepart-entity/sparepart-entity");
const sparepartAttribute = {
    include: [
        ['createdAt', 'created_at'],
        ['updatedAt', 'updated_at'],
    ],
    exclude: ['createdAt', 'updatedAt'],
};
exports.sparepartAttribute = sparepartAttribute;
const sparepartInclude = [
    {
        model: free_text_entity_1.freeTextEntity,
        attributes: {
            include: [
                ['createdAt', 'created_at'],
                ['updatedAt', 'updated_at'],
            ],
            exclude: ['createdAt', 'updatedAt'],
        },
        as: 'free_text',
    },
];
exports.sparepartInclude = sparepartInclude;
sparepart_entity_1.sparepartEntity.hasMany(free_text_entity_1.freeTextEntity, {
    sourceKey: 'id',
    foreignKey: { name: 'sparepart_id', allowNull: false },
    as: 'free_text',
});
const sparepartAssociate = sparepart_entity_1.sparepartEntity;
exports.sparepartAssociate = sparepartAssociate;
//# sourceMappingURL=sparepart-associate.js.map