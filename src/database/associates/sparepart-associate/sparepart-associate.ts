import { FindAttributeOptions, Includeable } from 'sequelize';
import { freeTextEntity } from '../../../database/entities/public/free-text-entity/free-text-entity';
import { sparepartEntity } from '../../../database/entities/services/sparepart-entity/sparepart-entity';

const sparepartAttribute: FindAttributeOptions = {
  exclude: [],
  include: [],
};

const sparepartInclude: Includeable[] = [
  {
    model: freeTextEntity,
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
