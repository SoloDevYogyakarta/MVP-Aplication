"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const system_1 = require("../../utils/system/system");
const files_entity_1 = require("../../database/entities/services/files-entity/files-entity");
const history_entity_1 = require("../../database/entities/services/history-entity/history-entity");
const order_entity_1 = require("../../database/entities/services/order-entity/order-entity");
let OrderService = class OrderService {
    async destroy(id) {
        const findOne = await order_entity_1.orderEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Order not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const history = await history_entity_1.historyEntity.findAll({
            where: { order_id: findOne.id },
        });
        for (const values of history) {
            values?.destroy();
        }
        const files = await files_entity_1.fileEntity.findAll({ where: { order_id: findOne.id } });
        for (const file of files) {
            if (file.filepath) {
                try {
                    (0, system_1.removepath)(`../..${file.filepath}`);
                }
                catch (err) {
                }
            }
            file?.destroy();
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Order has been delete' };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
//# sourceMappingURL=order-service.js.map