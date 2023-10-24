import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { sequelize } from '../../entity';
import { BaseEntity } from '../../base-entity/base-entity';

export class UserEntity extends BaseEntity {
  username: string;
  email: string;
  phone_number: number;
  password: string;
  role: string;
  file_id: string;
}

export type UserCreationAttribute = Optional<UserEntity, 'id'>;
export interface UserInstance
  extends Model<UserCreationAttribute, UserEntity>,
    UserEntity {}
export const userEntity = sequelize.define<UserInstance>(
  'USER',
  {
    public_id: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    file_id: DataTypes.STRING,
  } as ModelAttributes<UserInstance>,
  {
    tableName: 'USER',
    schema: 'AUTHENTICATE',
    hooks: {
      beforeCreate(attributes, options) {
        const instance = attributes;
        instance.public_id = nanoid();
        instance.password = bcrypt.hashSync(instance.password, 10);
      },
    },
  },
);
