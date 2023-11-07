import { FindAttributeOptions, Includeable } from 'sequelize';
import { freeTextEntity } from '../../../database/entities/public/free-text-entity/free-text-entity';
import { sparepartEntity } from '../../../database/entities/services/sparepart-entity/sparepart-entity';

const sparepartAttribute: FindAttributeOptions = {
  include: [
    ['createdAt', 'created_at'],
    ['updatedAt', 'updated_at'],
  ],
  exclude: ['createdAt', 'updatedAt'],
};

const sparepartInclude: Includeable[] = [
  {
    model: freeTextEntity,
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

sparepartEntity.hasMany(freeTextEntity, {
  sourceKey: 'id',
  foreignKey: { name: 'sparepart_id', allowNull: false },
  as: 'free_text',
});

const sparepartAssociate = sparepartEntity;

export { sparepartAttribute, sparepartInclude, sparepartAssociate };
