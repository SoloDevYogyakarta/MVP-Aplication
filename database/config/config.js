require('dotenv').config();

const env = process.env;

module.exports = {
  development: {
    username: env['DB_USER'],
    password: env['DB_PASS'],
    host: env['DB_HOST'],
    port: Number(env['DB_PORT']),
    database: env['DB_NAME'],
    dialect: env['DB_DIALECT'],
  },
};
