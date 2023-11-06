"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingEntity = exports.BookingEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class BookingEntity extends base_entity_1.BaseEntity {
}
exports.BookingEntity = BookingEntity;
exports.bookingEntity = entity_1.sequelize.define('BOOKING', {
    name: sequelize_1.DataTypes.STRING,
    title: sequelize_1.DataTypes.TEXT,
    desc: sequelize_1.DataTypes.TEXT,
    user_id: sequelize_1.DataTypes.INTEGER,
    date: sequelize_1.DataTypes.DATE,
    time: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'BOOKING',
    schema: 'SERVICES',
});
//# sourceMappingURL=booking-entity.js.map