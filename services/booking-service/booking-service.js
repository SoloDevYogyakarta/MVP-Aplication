"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BookingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../database/entities/authenticate/user-entity/user-entity");
const booking_entity_1 = require("../../database/entities/services/booking-entity/booking-entity");
let BookingService = BookingService_1 = class BookingService {
    constructor() {
        this.logger = new common_1.Logger(BookingService_1.name);
    }
    async create(body) {
        this.logger.log(BookingService_1.name);
        const findOne = await user_entity_1.userEntity.findOne({
            where: { id: body?.user_id ?? 0 },
        });
        if (findOne) {
            body = { ...body, user_id: findOne.id };
        }
        const create = await booking_entity_1.bookingEntity.create({ ...body });
        create.save();
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'Booking has been create',
            create,
        };
    }
    async destroy(id) {
        const findOne = await booking_entity_1.bookingEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Booking not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Booking has been delete' };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = BookingService_1 = __decorate([
    (0, common_1.Injectable)()
], BookingService);
//# sourceMappingURL=booking-service.js.map