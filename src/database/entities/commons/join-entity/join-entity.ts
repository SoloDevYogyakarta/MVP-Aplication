import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class JoinEntity extends BaseEntity {
  source_id: string;
  foreign_id: string;
}

export type JoinCreationAttribute = Optional<JoinEntity, 'id'>;
export interface JoinInstance
  extends Model<JoinCreationAttribute, JoinEntity>,
    JoinEntity {}
export const joinEntity = sequelize.define<JoinInstance>(
  'JOIN',
  {
    public_id: DataTypes.STRING,
    source_id: DataTypes.STRING,
    foreign_id: DataTypes.STRING,
  } as ModelAttributes<JoinInstance>,
  {
    tableName: 'JOIN',
    schema: 'COMMONS',
    timestamps: false,
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
