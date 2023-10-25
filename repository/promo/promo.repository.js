"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPromoRepository = void 0;
const common_1 = require("@nestjs/common");
const dynamic_filter_1 = require("../../utils/dynamic-filter/dynamic-filter");
const promo_associate_1 = require("../../database/associates/promo-associate/promo-associate");
let ProductPromoRepository = class ProductPromoRepository {
    async findOne(public_id) {
        return await promo_associate_1.productPromoAssciate.findOne({
            where: { public_id },
            attributes: promo_associate_1.productPromoAttribute,
            include: promo_associate_1.productPromoInclude,
        });
    }
    async findAll(query) {
        let where = {}, datas = [];
        where = (0, dynamic_filter_1.dynamicFilter)(where, datas, query);
        return await promo_associate_1.productPromoAssciate.findAll({
            where: where,
            attributes: promo_associate_1.productPromoAttribute,
            include: promo_associate_1.productPromoInclude,
        });
    }
};
exports.ProductPromoRepository = ProductPromoRepository;
exports.ProductPromoRepository = ProductPromoRepository = __decorate([
    (0, common_1.Injectable)()
], ProductPromoRepository);
//# sourceMappingURL=promo.repository.js.map