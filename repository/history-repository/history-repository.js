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
let HistoryRepository = HistoryRepository_1 = class HistoryRepository {
    constructor() {
        this.logger = new common_1.Logger(HistoryRepository_1.name);
    }
    async findAll() {
        this.logger.log(HistoryRepository_1.name);
        let result = await user_associate_1.userAssociate.findAll({
            attributes: user_associate_1.userAttribute,
            include: user_associate_1.userHistoryInclude,
        });
        for (const values of result) {
            const visit = await this.visit(values.id);
            result = JSON.parse(JSON.stringify(result)).map((item) => {
                if (item.id === values.id) {
                    item['visit'] = Number(visit);
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
        result['visit'] = Number(await this.visit(id));
        return result;
    }
    async visit(id) {
        const query = await entity_1.sequelize.query(`SELECT a.user_id, COUNT(a.user_id) as visit FROM "PRODUCTS"."ORDER" AS a WHERE a.user_id = '${id}' GROUP BY a.user_id `);
        const visit = query[0].find((item) => Number(item.user_id) === Number(id));
        return visit?.visit ? visit.visit : 0;
    }
};
exports.HistoryRepository = HistoryRepository;
exports.HistoryRepository = HistoryRepository = HistoryRepository_1 = __decorate([
    (0, common_1.Injectable)()
], HistoryRepository);
//# sourceMappingURL=history-repository.js.map