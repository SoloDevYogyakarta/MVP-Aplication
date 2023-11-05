require('dotenv').config();

const env = process.env;

module.exports = {
  development: {
    username: env['DB_USER'],
    password: env['DB_PASS'],
    database: env['DB_NAME'],
    host: env['DB_HOST'],
    port: Number(env['DB_PORT']),
    dialect: env['DB_DIALECT'],
  },
};
