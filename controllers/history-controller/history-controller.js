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
var ServiceHistoryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHistoryController = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const history_service_1 = require("../../services/history-service/history-service");
const history_repository_1 = require("../../repository/history-repository/history-repository");
const auth_guard_1 = require("../../middleware/auth-guard/auth-guard");
const platform_express_1 = require("@nestjs/platform-express");
const upload_1 = require("../../utils/upload/upload");
let ServiceHistoryController = ServiceHistoryController_1 = class ServiceHistoryController {
    constructor(repository, service) {
        this.repository = repository;
        this.service = service;
        this.logger = new common_1.Logger(ServiceHistoryController_1.name);
    }
    async create(files, req, res) {
        this.logger.log(ServiceHistoryController_1.name);
        const result = await this.service.create(req.params.id, req.body.desc, JSON.parse(req.body.data), files);
        return res.status(result.status).json((0, lodash_1.omit)(result, ['result']));
    }
    async all(res) {
        this.logger.log(ServiceHistoryController_1.name);
        const result = await this.repository.findAll();
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async detail(req, res) {
        this.logger.log(ServiceHistoryController_1.name);
        const result = await this.repository.findOne(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async destroy(req, res) {
        const result = await this.service.destroy(req.params.id);
        return res.status(result.status).json(result);
    }
};
exports.ServiceHistoryController = ServiceHistoryController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 5, { storage: upload_1.uploadOptions })),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceHistoryController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceHistoryController.prototype, "detail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServiceHistoryController.prototype, "destroy", null);
exports.ServiceHistoryController = ServiceHistoryController = ServiceHistoryController_1 = __decorate([
    (0, common_1.Controller)('services/history'),
    __metadata("design:paramtypes", [history_repository_1.HistoryRepository,
        history_service_1.HistoryService])
], ServiceHistoryController);
//# sourceMappingURL=history-controller.js.map