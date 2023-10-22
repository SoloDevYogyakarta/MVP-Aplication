import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class ConnectEntity extends BaseEntity {
  source_id: string;
  foreign_id: string;
}

export type ConnectCreationAttribute = Optional<ConnectEntity, 'id'>;
export interface ConnectInstance
  extends Model<ConnectCreationAttribute, ConnectEntity>,
    ConnectEntity {}
export const connectEntity = sequelize.define<ConnectInstance>(
  'CONNECT',
  {
    public_id: DataTypes.STRING,
    source_id: DataTypes.STRING,
    foreign_id: DataTypes.STRING,
  } as ModelAttributes<ConnectInstance>,
  {
    tableName: 'CONNECT',
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
