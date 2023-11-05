"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const environment_1 = require("../../utils/environment/environment");
const system_1 = require("../../utils/system/system");
exports.sequelize = new sequelize_1.Sequelize(environment_1.environment['DB_NAME'], environment_1.environment['DB_USER'], environment_1.environment['DB_PASS'], {
    logging: false,
    host: environment_1.environment['DB_HOST'],
    port: Number(environment_1.environment['DB_PORT']),
    database: environment_1.environment['DB_NAME'],
    storage: (0, system_1.joinpath)('../mvpapplication.sqlite'),
    dialect: environment_1.environment['DB_DIALECT'],
});
//# sourceMappingURL=entity.js.map