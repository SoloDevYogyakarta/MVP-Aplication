import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';

dotenv.config();

const env = process.env;

export const sequelize = new Sequelize(
  env['DB_NAME'],
  env['DB_USER'],
  env['DB_PASS'],
  {
    host: env['DB_HOST'],
    port: Number(env['DB_PORT']),
    logging: false,
    database: env['DB_NAME'],
    dialect: env['DB_DIALECT'] as Dialect,
  },
);
