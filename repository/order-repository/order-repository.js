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
var OrderRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const order_associate_1 = require("../../database/associates/order-associate/order-associate");
const filter_1 = require("../../utils/filter/filter");
const history_repository_1 = require("../history-repository/history-repository");
let OrderRepository = OrderRepository_1 = class OrderRepository {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(OrderRepository_1.name);
    }
    async findAll(query, type) {
        this.logger.log(OrderRepository_1.name);
        let where = {};
        where = (0, filter_1.filter)(query, type);
        let result = await order_associate_1.orderAssociate.findAll({
            where: where,
            attributes: order_associate_1.orderAttribute,
            include: order_associate_1.orderInclude,
        });
        result = JSON.parse(JSON.stringify(result));
        for (const order of result) {
            const totalOrder = await this.repository.totalOrder(order.user_id);
            result = result.map((item) => {
                if (order.id === item.id) {
                    const total = totalOrder[0].total;
                    item['total'] = Number(total);
                }
                return item;
            });
        }
        return result;
    }
    async findOne(id) {
        let result = await order_associate_1.orderAssociate.findOne({
            where: { id },
            attributes: order_associate_1.orderAttribute,
            include: order_associate_1.orderInclude,
        });
        if (!result) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Order not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        result = JSON.parse(JSON.stringify(result));
        const total = await this.repository.totalOrder(result.user_id);
        result['total'] = Number(total[0].total);
        return result;
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = OrderRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [history_repository_1.HistoryRepository])
], OrderRepository);
//# sourceMappingURL=order-repository.js.map