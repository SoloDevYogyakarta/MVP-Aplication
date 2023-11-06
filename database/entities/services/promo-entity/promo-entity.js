"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoEntity = exports.PromoEntity = void 0;
const sequelize_1 = require("sequelize");
const base_entity_1 = require("../../base-entity/base-entity");
const entity_1 = require("../../entity");
class PromoEntity extends base_entity_1.BaseEntity {
}
exports.PromoEntity = PromoEntity;
exports.promoEntity = entity_1.sequelize.define('PROMO', {
    name: sequelize_1.DataTypes.STRING,
    desc: sequelize_1.DataTypes.TEXT,
    image: sequelize_1.DataTypes.STRING,
    price: sequelize_1.DataTypes.INTEGER,
    discount: sequelize_1.DataTypes.INTEGER,
    start_time: sequelize_1.DataTypes.DATE,
    end_time: sequelize_1.DataTypes.DATE,
    user_id: sequelize_1.DataTypes.STRING,
}, {
    tableName: 'PROMO',
    schema: 'SERVICES',
});
//# sourceMappingURL=promo-entity.js.map