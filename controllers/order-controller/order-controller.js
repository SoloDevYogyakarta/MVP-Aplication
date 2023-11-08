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
var ServicesOrderController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesOrderController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../middleware/auth-guard/auth-guard");
const order_service_1 = require("../../services/order-service/order-service");
const order_repository_1 = require("../../repository/order-repository/order-repository");
const lodash_1 = require("lodash");
let ServicesOrderController = ServicesOrderController_1 = class ServicesOrderController {
    constructor(service, repository) {
        this.service = service;
        this.repository = repository;
        this.logger = new common_1.Logger(ServicesOrderController_1.name);
    }
    async list(req, res) {
        const result = await this.repository.findAll((0, lodash_1.omit)(req.query, ['type']), req.query.type);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async detail(req, res) {
        const result = await this.repository.findOne(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async destroy(req, res) {
        this.logger.log(ServicesOrderController_1.name);
        const result = await this.service.destroy(req.params.id);
        return res.status(result.status).json(result);
    }
};
exports.ServicesOrderController = ServicesOrderController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesOrderController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id/services'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesOrderController.prototype, "detail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesOrderController.prototype, "destroy", null);
exports.ServicesOrderController = ServicesOrderController = ServicesOrderController_1 = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        order_repository_1.OrderRepository])
], ServicesOrderController);
//# sourceMappingURL=order-controller.js.map