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
var PromoController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoController = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const promo_service_1 = require("../../services/promo-service/promo-service");
const auth_guard_1 = require("../../middleware/auth-guard/auth-guard");
const platform_express_1 = require("@nestjs/platform-express");
const upload_1 = require("../../utils/upload/upload");
const promo_repository_1 = require("../../repository/promo-repository/promo-repository");
const system_1 = require("../../utils/system/system");
let PromoController = PromoController_1 = class PromoController {
    constructor(service, repository) {
        this.service = service;
        this.repository = repository;
        this.logger = new common_1.Logger(PromoController_1.name);
    }
    async create(file, req, res) {
        this.logger.log(PromoController_1.name);
        const result = await this.service.create(req.user.data.id, req.body, file);
        (0, system_1.createpath)('../folder-text/promo-http-entity.txt', result.create);
        return res.status(common_1.HttpStatus.CREATED).json((0, lodash_1.omit)(result, ['create']));
    }
    async update(file, req, res) {
        const result = await this.service.update(req.params.id, req.body, file);
        return res.status(result.status).json(result);
    }
    async destroy(req, res) {
        const result = await this.service.destroy(req.params.id);
        return res.status(result.status).json(result);
    }
    async all(req, res) {
        const result = await this.repository.findAll(req.query, req.query.type);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async detail(req, res) {
        const result = await this.repository.findOne(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
};
exports.PromoController = PromoController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: upload_1.uploadOptions })),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: upload_1.uploadOptions })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "destroy", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "all", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromoController.prototype, "detail", null);
exports.PromoController = PromoController = PromoController_1 = __decorate([
    (0, common_1.Controller)('promo'),
    __metadata("design:paramtypes", [promo_service_1.PromoService,
        promo_repository_1.PromoRepository])
], PromoController);
//# sourceMappingURL=promo-controller.js.map