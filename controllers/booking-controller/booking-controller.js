"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BookingController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const booking_dto_1 = require("../../dto/booking-dto/booking-dto");
const auth_guard_1 = require("../../middleware/auth-guard/auth-guard");
const booking_repository_1 = require("../../repository/booking-repository/booking-repository");
const booking_service_1 = require("../../services/booking-service/booking-service");
const system_1 = require("../../utils/system/system");
let BookingController = BookingController_1 = class BookingController {
    constructor(service, repository) {
        this.service = service;
        this.repository = repository;
        this.logger = new common_1.Logger(BookingController_1.name);
    }
    async create(body, res) {
        this.logger.log(BookingController_1.name);
        const result = await this.service.create(body);
        (0, system_1.createpath)('../folder-text/booking-http-entity.txt', result.create);
        return res.status(result.status).json((0, lodash_1.omit)(result, ['create']));
    }
    async destroy(req, res) {
        this.logger.log(BookingController_1.name);
        const result = await this.service.destroy(req.params.id);
        return res.status(result.status).json(result);
    }
    async list(req, res) {
        this.logger.log(BookingController_1.name);
        const result = await this.repository.findAll(req.query, req.query.type);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async detail(req, res) {
        this.logger.log(BookingController_1.name);
        const result = await this.repository.findOne(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.BookingField, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "destroy", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "detail", null);
exports.BookingController = BookingController = BookingController_1 = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        booking_repository_1.BookingRepository])
], BookingController);
//# sourceMappingURL=booking-controller.js.map