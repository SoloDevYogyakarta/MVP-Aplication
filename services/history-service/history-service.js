"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HistoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("../../database/entities/services/order-entity/order-entity");
const user_entity_1 = require("../../database/entities/authenticate/user-entity/user-entity");
const history_entity_1 = require("../../database/entities/services/history-entity/history-entity");
const files_entity_1 = require("../../database/entities/services/files-entity/files-entity");
let HistoryService = HistoryService_1 = class HistoryService {
    constructor() {
        this.logger = new common_1.Logger(HistoryService_1.name);
    }
    async create(id, desc, body, files) {
        this.logger.log(HistoryService_1.name);
        const findOne = await user_entity_1.userEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Account not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const order = await order_entity_1.orderEntity.create({ desc, user_id: findOne.id });
        order.save();
        for (const values of body) {
            const create = await history_entity_1.historyEntity.create({
                ...values,
                order_id: order.id,
            });
            create.save();
        }
        for (const file of files) {
            const filepath = `/assets${file.path.split('/assets')[1]}`;
            const f = await files_entity_1.fileEntity.create({
                originalname: file.originalname,
                type: file.mimetype.split('/')[1],
                filepath,
                order_id: order.id,
            });
            f.save();
        }
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'History has been added',
            result: order,
        };
    }
    async destroy(id) {
        const findOne = await history_entity_1.historyEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'History not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'History has been delete' };
    }
};
exports.HistoryService = HistoryService;
exports.HistoryService = HistoryService = HistoryService_1 = __decorate([
    (0, common_1.Injectable)()
], HistoryService);
//# sourceMappingURL=history-service.js.map