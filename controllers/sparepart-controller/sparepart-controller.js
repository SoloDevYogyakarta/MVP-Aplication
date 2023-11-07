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
var SparepartController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparepartController = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const auth_guard_1 = require("../../middleware/auth-guard/auth-guard");
const sparepart_repository_1 = require("../../repository/sparepart-repository/sparepart-repository");
const sparepart_service_1 = require("../../services/sparepart-service/sparepart-service");
const system_1 = require("../../utils/system/system");
let SparepartController = SparepartController_1 = class SparepartController {
    constructor(repository, service) {
        this.repository = repository;
        this.service = service;
        this.logger = new common_1.Logger(SparepartController_1.name);
    }
    async create(body, res) {
        this.logger.log(SparepartController_1.name);
        const result = await this.service.create(body);
        (0, system_1.createpath)('../folder-text/sparepart-http-entity.txt', result.create);
        (0, system_1.createpath)(`../folder-text/free-text-http-entity.txt`, result.free);
        return res.status(result.status).json((0, lodash_1.omit)(result, ['create', 'free']));
    }
    async update(req, res, body) {
        this.logger.log(SparepartController_1.name);
        const result = await this.service.update(req.params.id, body);
        return res.status(result.status).json(result);
    }
    async destroy(req, res) {
        this.logger.log(SparepartController_1.name);
        const result = await this.service.destroy(req.params.id);
        return res.status(result.status).json(result);
    }
    async destroyFreeText(req, res) {
        this.logger.log(SparepartController_1.name);
        const result = await this.service.freeDestroy(req.params.id);
        return res.status(result.status).json(result);
    }
    async list(res) {
        this.logger.log(SparepartController_1.name);
        const result = await this.repository.findALl();
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async detail(req, res) {
        this.logger.log(SparepartController_1.name);
        const result = await this.repository.findOne(req.params.id);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
};
exports.SparepartController = SparepartController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], SparepartController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Array]),
    __metadata("design:returntype", Promise)
], SparepartController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SparepartController.prototype, "destroy", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('free-text/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SparepartController.prototype, "destroyFreeText", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SparepartController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SparepartController.prototype, "detail", null);
exports.SparepartController = SparepartController = SparepartController_1 = __decorate([
    (0, common_1.Controller)('sparepart'),
    __metadata("design:paramtypes", [sparepart_repository_1.SparepartRepository,
        sparepart_service_1.SparepartService])
], SparepartController);
//# sourceMappingURL=sparepart-controller.js.map