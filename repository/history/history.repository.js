"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const entity_1 = require("../../database/entities/entity");
const history_associate_1 = require("../../database/associates/history-associate/history-associate");
const dynamic_filter_1 = require("../../utils/dynamic-filter/dynamic-filter");
let HistoryRepository = class HistoryRepository {
    async findOne(public_id) {
        return await history_associate_1.historyAssociate.findOne({
            where: { public_id },
            attributes: history_associate_1.historyAttribute,
            include: history_associate_1.historyInclude,
        });
    }
    async findAll(query) {
        let where = {}, datas = [];
        where = (0, dynamic_filter_1.dynamicFilter)(where, datas, query);
        const historyWithTotal = await entity_1.sequelize.query(`
      SELECT a.*, cast(sum(d.value) as int) as total FROM "SERVICES"."HISTORY" AS a
      LEFT JOIN "COMMONS"."JOIN" AS b ON b.source_id = a.public_id
      LEFT JOIN "PRODUCTS"."BASIC" AS c ON c.public_id = b.foreign_id
      LEFT JOIN "PRODUCTS"."PRICE" AS d ON d.product_id = c.public_id
      GROUP BY a.id
    `);
        const resultHistory = historyWithTotal[0];
        const result = await history_associate_1.historyAssociate.findAll({
            where: where,
            attributes: history_associate_1.historyAttribute,
            include: history_associate_1.historyInclude,
        });
        return resultHistory.map((item) => {
            const history2 = result.filter((i) => i.public_id === item.public_id);
            if (history2.length) {
                item = Object.assign(item, JSON.parse(JSON.stringify(history2[0])));
            }
            return item;
        });
    }
};
exports.HistoryRepository = HistoryRepository;
exports.HistoryRepository = HistoryRepository = __decorate([
    (0, common_1.Injectable)()
], HistoryRepository);
//# sourceMappingURL=history.repository.js.map