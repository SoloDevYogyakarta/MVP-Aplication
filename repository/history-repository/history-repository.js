"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HistoryRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const entity_1 = require("../../database/entities/entity");
const user_associate_1 = require("../../database/associates/user-associate/user-associate");
const filter_1 = require("../../utils/filter/filter");
let HistoryRepository = HistoryRepository_1 = class HistoryRepository {
    constructor() {
        this.logger = new common_1.Logger(HistoryRepository_1.name);
    }
    async findAll(query, type) {
        let where = {};
        this.logger.log(HistoryRepository_1.name);
        where = (0, filter_1.filter)(query, type);
        let result = await user_associate_1.userAssociate.findAll({
            where: where,
            attributes: user_associate_1.userAttribute,
            include: user_associate_1.userHistoryInclude,
            order: [['id', 'ASC']],
        });
        for (const values of result) {
            const visit = await this.visit(values.id);
            const total = await this.total(values.id);
            const totalOrder = await this.totalOrder(values.id);
            result = JSON.parse(JSON.stringify(result)).map((item) => {
                if (item.id === values.id) {
                    item['visit'] = Number(visit);
                    item['total'] = total;
                }
                if (totalOrder.length) {
                    item['order'] = item.order.map((ord) => {
                        const total_order = totalOrder.find((i) => i.id === ord.id);
                        if (total_order) {
                            if (item.id === ord.user_id) {
                                ord['total'] = total_order?.total
                                    ? Number(total_order.total)
                                    : 0;
                            }
                        }
                        return ord;
                    });
                }
                return item;
            });
        }
        return result;
    }
    async findOne(id) {
        this.logger.log(HistoryRepository_1.name);
        let result = await user_associate_1.userAssociate.findOne({
            where: { id },
            attributes: user_associate_1.userAttribute,
            include: user_associate_1.userHistoryInclude,
        });
        result = JSON.parse(JSON.stringify(result));
        for (const values of result
            .order) {
            const total = await this.totalOrder(values.id);
            result['order'] = result.order.map((item) => {
                if (item.id === values.id) {
                    item['total'] = total[0].total;
                }
                return item;
            });
        }
        result['visit'] = Number(await this.visit(id));
        result['total'] = await this.total(id);
        return result;
    }
    async visit(id) {
        const query = await entity_1.sequelize.query(`SELECT a.user_id, COUNT(a.user_id) as visit FROM "PRODUCTS"."ORDER" AS a WHERE a.user_id = '${id}' GROUP BY a.user_id `);
        const visit = query[0].find((item) => Number(item.user_id) === Number(id));
        return visit?.visit ? visit.visit : 0;
    }
    async totalOrder(id) {
        const query = await entity_1.sequelize.query(`
    SELECT a.id,a.user_id,SUM(CAST(b.price as int)) as total FROM "PRODUCTS"."ORDER" AS a
    LEFT JOIN "SERVICES"."HISTORY" AS b ON b.order_id = a.id WHERE a.user_id = ${id}
    GROUP BY a.id;
    `);
        return query[0];
    }
    async total(id) {
        const query = await entity_1.sequelize.query(`
      SELECT a.user_id,SUM(CAST(b.price as int)) as total FROM "PRODUCTS"."ORDER" AS a
      LEFT JOIN "SERVICES"."HISTORY" AS b ON b.order_id = a.id WHERE a.user_id = ${id}
      GROUP BY a.id
    `);
        const result = query[0]
            .map((item) => (item.total === null ? 0 : item.total))
            ?.reduce((arr, curr) => {
            return Number(arr) + Number(curr);
        }, 0);
        return result ? Number(result) : 0;
    }
};
exports.HistoryRepository = HistoryRepository;
exports.HistoryRepository = HistoryRepository = HistoryRepository_1 = __decorate([
    (0, common_1.Injectable)()
], HistoryRepository);
//# sourceMappingURL=history-repository.js.map