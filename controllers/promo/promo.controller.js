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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoController = void 0;
const common_1 = require("@nestjs/common");
const promo_repository_1 = require("../../repository/promo/promo.repository");
const product_query_1 = require("../../validators/query/product.query");
const promo_validator_1 = require("../../validators/promo/promo.validator");
const promo_service_1 = require("../../services/promo/promo.service");
const guards_middleware_1 = require("../../middleware/guards.middleware");
let PromoController = class PromoController {
    constructor(repository, service) {
        this.repository = repository;
        this.service = service;
    }
    async created(req, res, body) {
        const result = await this.service.create(body, req.user.data.public_id);
        return res.status(result.status).json(result);
    }
    async updated(req, res, body) {
        const result = await this.service.update(body, req.params.id, req.user.data.public_id);
        return res.status(result.status).json(result);
    }
    async list(query, req, res) {
        const result = this.repository.findAll(query);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async detail(req, res) {
        const result = await this.repository.findOne(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async destroy(req, res) {
        const result = await this.service.destroy(req.params.id, req.user.data.public_id);
        return res.status(result.status).json(result);
    }
};
exports.PromoController = PromoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, promo_validator_1.PromoField]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "created", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, promo_validator_1.PromoField]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "updated", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_query_1.DyanmicQuery, Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "detail", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "destroy", null);
exports.PromoController = PromoController = __decorate([
    (0, common_1.Controller)('promo'),
    __metadata("design:paramtypes", [promo_repository_1.ProductPromoRepository,
        promo_service_1.ProductPromoService])
], PromoController);
//# sourceMappingURL=promo.controller.js.map