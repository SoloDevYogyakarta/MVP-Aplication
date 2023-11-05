import { nanoid } from 'nanoid';
import { DataTypes, Model, ModelAttributes, Optional } from 'sequelize';
import { SuperTest } from 'supertest';
import { BaseEntity } from '../../base-entity/base-entity';
import { sequelize } from '../../entity';

export class UserEntity extends BaseEntity {
  plat_number: string;
  phone_number: string;
  name: string;
  motor: string;
  year_production: number;
  address: string;
  role: string;
  password: string;
}

export type UserCreationAttribute = Optional<UserEntity, 'id'>;
export interface UserInstance
  extends Model<UserCreationAttribute, UserEntity>,
    UserEntity {}
export const userEntity = sequelize.define<UserInstance>(
  'USER',
  {
    plat_number: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    name: DataTypes.STRING,
    motor: DataTypes.STRING,
    year_production: DataTypes.INTEGER,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
  } as ModelAttributes<UserInstance>,
  {
    tableName: 'USER',
    schema: 'AUTHENTICATE',
  },
);
