"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../database/entities/authenticates/user-entity/user-entity");
const history_entity_1 = require("../../database/entities/services/history-entity/history-entity");
let HistoryService = class HistoryService {
    async destroy(public_id, user_id) {
        await this.isAdmin(user_id);
        const findOne = await history_entity_1.historyEntity.findOne({ where: { public_id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not Found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'History has been delete' };
    }
    async isAdmin(public_id) {
        const findOne = await user_entity_1.userEntity.findOne({ where: { public_id } });
        if (findOne?.role !== 'admin') {
            throw new common_1.HttpException('false', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.HistoryService = HistoryService;
exports.HistoryService = HistoryService = __decorate([
    (0, common_1.Injectable)()
], HistoryService);
//# sourceMappingURL=history-service.js.map