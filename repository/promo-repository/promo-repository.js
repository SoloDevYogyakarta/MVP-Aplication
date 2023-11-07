"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PromoRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoRepository = void 0;
const common_1 = require("@nestjs/common");
const filter_1 = require("../../utils/filter/filter");
const promo_entity_1 = require("../../database/entities/services/promo-entity/promo-entity");
let PromoRepository = PromoRepository_1 = class PromoRepository {
    constructor() {
        this.logger = new common_1.Logger(PromoRepository_1.name);
    }
    async findAll(query, type) {
        let where = {};
        this.logger.log(PromoRepository_1.name);
        where = (0, filter_1.filter)(query, type);
        return await promo_entity_1.promoEntity.findAll({
            where: where,
            order: [['id', 'ASC']],
        });
    }
    async findOne(id) {
        this.logger.log(PromoRepository_1.name);
        return await promo_entity_1.promoEntity.findOne({ where: { id } });
    }
};
exports.PromoRepository = PromoRepository;
exports.PromoRepository = PromoRepository = PromoRepository_1 = __decorate([
    (0, common_1.Injectable)()
], PromoRepository);
//# sourceMappingURL=promo-repository.js.map