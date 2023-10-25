"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const booking_entity_1 = require("../../database/entities/services/booking-entity/booking-entity");
const lodash_1 = require("lodash");
const nanoid_1 = require("nanoid");
const system_1 = require("../../utils/system/system");
let BookingService = class BookingService {
    constructor() {
        this.regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    }
    async create(body) {
        const data = { username: body.token };
        if (this.regex.test(body.token)) {
            data['email'] = body.token;
            delete data.username;
        }
        const create = await booking_entity_1.bookingEntity.create({
            public_id: (0, nanoid_1.nanoid)(),
            ...data,
            ...(0, lodash_1.omit)(body, ['token']),
        });
        create.save();
        (0, system_1.createpath)('../../database/dataTxt/booking-http-entity.txt', create);
        return { status: common_1.HttpStatus.CREATED, message: 'Booking has been create' };
    }
    async destroy(public_id) {
        const findOne = await booking_entity_1.bookingEntity.findOne({ where: { public_id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Booking not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Booking has been delete' };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)()
], BookingService);
//# sourceMappingURL=booking.service.js.map