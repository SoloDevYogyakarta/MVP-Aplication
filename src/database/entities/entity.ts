import { Dialect, Sequelize } from 'sequelize';
import { environment } from '../../utils/environment/environment';
import { joinpath } from '../../utils/system/system';

export const sequelize = new Sequelize(
  environment['DB_NAME'],
  environment['DB_USER'],
  environment['DB_PASS'],
  {
    logging: false,
    host: environment['DB_HOST'],
    port: Number(environment['DB_PORT']),
    database: environment['DB_NAME'],
    storage: joinpath('../mvpapplication.sqlite'),
    dialect: environment['DB_DIALECT'] as Dialect,
  },
);
