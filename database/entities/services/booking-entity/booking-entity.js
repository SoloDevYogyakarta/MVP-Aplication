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
    public_id: sequelize_1.DataTypes.STRING,
    username: sequelize_1.DataTypes.STRING,
    user_id: sequelize_1.DataTypes.STRING,
    day: sequelize_1.DataTypes.DATE,
    desc: sequelize_1.DataTypes.TEXT,
}, {
    tableName: 'BOOKING',
    schema: 'SERVICES',
});
//# sourceMappingURL=booking-entity.js.map