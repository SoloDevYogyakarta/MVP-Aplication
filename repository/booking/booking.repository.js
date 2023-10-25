"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const common_1 = require("@nestjs/common");
const booking_entity_1 = require("../../database/entities/services/booking-entity/booking-entity");
const dynamic_filter_1 = require("../../utils/dynamic-filter/dynamic-filter");
let BookingRepository = class BookingRepository {
    async findOne(public_id) {
        return await booking_entity_1.bookingEntity.findOne({ where: { public_id } });
    }
    async findAll(query) {
        let where = {}, datas = [];
        where = (0, dynamic_filter_1.dynamicFilter)(where, datas, query);
        return await booking_entity_1.bookingEntity.findAll({
            where: where,
        });
    }
};
exports.BookingRepository = BookingRepository;
exports.BookingRepository = BookingRepository = __decorate([
    (0, common_1.Injectable)()
], BookingRepository);
//# sourceMappingURL=booking.repository.js.map