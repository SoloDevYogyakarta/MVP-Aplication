"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const env = process.env;
exports.sequelize = new sequelize_1.Sequelize(env['DB_NAME'], env['DB_USER'], env['DB_PASS'], {
    host: env['DB_HOST'],
    port: Number(env['DB_PORT']),
    logging: false,
    database: env['DB_NAME'],
    dialect: env['DB_DIALECT'],
});
//# sourceMappingURL=entity.js.map