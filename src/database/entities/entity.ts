import { Dialect, Sequelize } from 'sequelize';
import { environment } from '../../utils/environment/environment';

export const sequelize = new Sequelize(
  environment['DB_NAME'],
  environment['DB_USER'],
  environment['DB_PASS'],
  {
    logging: false,
    host: environment['DB_HOST'],
    port: Number(environment['DB_PORT']),
    database: environment['DB_NAME'],
    dialect: environment['DB_DIALECT'] as Dialect,
  },
);
