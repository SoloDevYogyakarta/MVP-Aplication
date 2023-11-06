"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BookingRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const common_1 = require("@nestjs/common");
const booking_entity_1 = require("../../database/entities/services/booking-entity/booking-entity");
let BookingRepository = BookingRepository_1 = class BookingRepository {
    constructor() {
        this.logger = new common_1.Logger(BookingRepository_1.name);
    }
    async findAll() {
        this.logger.log(BookingRepository_1.name);
        return await booking_entity_1.bookingEntity.findAll();
    }
    async findOne(id) {
        this.logger.log(BookingRepository_1.name);
        return await booking_entity_1.bookingEntity.findOne({ where: { id } });
    }
};
exports.BookingRepository = BookingRepository;
exports.BookingRepository = BookingRepository = BookingRepository_1 = __decorate([
    (0, common_1.Injectable)()
], BookingRepository);
//# sourceMappingURL=booking-repository.js.map