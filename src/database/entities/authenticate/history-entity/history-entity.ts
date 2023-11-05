import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class UserHistoryEntity extends BaseEntity {
  plat_number: string;
  phone_number: string;
  name: string;
  address: string;
  user_id: string;
}

export type UserHistoryCreationAttribute = Optional<UserHistoryEntity, 'id'>;
export interface UserHistoryInstance
  extends Model<UserHistoryCreationAttribute, UserHistoryEntity>,
    UserHistoryEntity {}
export const userHistoryEntity = sequelize.define<UserHistoryInstance>(
  'HISTORY',
  {
    public_id: DataTypes.STRING,
    plat_number: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    user_id: DataTypes.STRING,
  } as ModelAttributes<UserHistoryInstance>,
  {
    tableName: 'HISTORY',
    schema: 'AUTHENTICATE',
    timestamps: false,
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
      },
    },
  },
);
