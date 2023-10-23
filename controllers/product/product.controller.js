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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_query_1 = require("../../validators/query/product.query");
const guards_middleware_1 = require("../../middleware/guards.middleware");
const product_repository_1 = require("../../repository/product/product.repository");
const product_service_1 = require("../../services/product/product.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../../utils/multer/multer");
let ProductController = class ProductController {
    constructor(service, repository) {
        this.service = service;
        this.repository = repository;
    }
    async create(req, res, files) {
        const result = await this.service.create(req.body, req.user.data.public_id, files);
        return res.status(result.status).json(result);
    }
    async update(req, res, files) {
        const result = await this.service.update(req.body, req.params.id, files);
        return res.status(result.status).json(result);
    }
    async destroy(req, res) {
        const result = await this.service.destroy(req.params.id);
        return res.status(result.status).json(result);
    }
    async list(query, res) {
        const result = await this.repository.findAll(query);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async detail(req, res) {
        const result = await this.repository.findOne(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, { storage: multer_1.diskStorage })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Post)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, { storage: multer_1.diskStorage })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "destroy", null);
__decorate([
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_query_1.DyanmicQuery, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "detail", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        product_repository_1.ProductRepository])
], ProductController);
//# sourceMappingURL=product.controller.js.map