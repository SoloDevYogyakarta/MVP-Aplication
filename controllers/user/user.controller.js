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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../../repository/user/user.repository");
const user_validator_1 = require("../../validators/user/user.validator");
const user_service_1 = require("../../services/user/user.service");
const guards_middleware_1 = require("../../middleware/guards.middleware");
const system_1 = require("../../utils/system/system");
const lodash_1 = require("lodash");
const product_query_1 = require("../../validators/query/product.query");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../../utils/multer/multer");
let UserController = class UserController {
    constructor(repository, service) {
        this.repository = repository;
        this.service = service;
    }
    async login(req, res, body) {
        const result = await this.service.login(body);
        return res.status(result.status).json(result);
    }
    async create(req, res, body) {
        const result = await this.service.create(body);
        (0, system_1.createpath)('../../database/dataTxt/user-http-entity.txt', result.result);
        return res.status(result.status).json((0, lodash_1.omit)(result, ['result']));
    }
    reset(req, res) {
        return res.status(common_1.HttpStatus.OK).json('reset');
    }
    async update(req, res, file) {
        const result = await this.service.update(req.params.id, req.body, file);
        return res.status(result.status).json(result);
    }
    async destroy(req, res) {
        const result = await this.service.destroy(req.params.id);
        return res.status(result.status).json(result);
    }
    async list(query, req, res) {
        const result = await this.repository.findAll(query);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async detail(req, res) {
        const result = await this.repository.findOne(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async me(req, res) {
        return res.status(common_1.HttpStatus.OK).json(req.user.data);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_validator_1.LoginField]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_validator_1.RegisterField]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('reset/password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "reset", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: multer_1.diskStorage })),
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "destroy", null);
__decorate([
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_query_1.DyanmicQuery, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "detail", null);
__decorate([
    (0, common_1.UseGuards)(guards_middleware_1.AuthGuard),
    (0, common_1.Get)('access/me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map