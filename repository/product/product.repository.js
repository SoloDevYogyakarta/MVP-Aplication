"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const basic_associate_1 = require("../../database/associates/basic-associate/basic-associate");
const dynamic_filter_1 = require("../../utils/dynamic-filter/dynamic-filter");
let ProductRepository = class ProductRepository {
    async findOne(public_id) {
        return await basic_associate_1.productBasicAssociate.findOne({
            where: { public_id },
            attributes: basic_associate_1.productBasicAttribute,
            include: basic_associate_1.productBasicInclude,
        });
    }
    async findAll(query) {
        let where = {}, datas = [];
        where = (0, dynamic_filter_1.dynamicFilter)(where, datas, query);
        return await basic_associate_1.productBasicAssociate.findAll({
            where: where,
            attributes: basic_associate_1.productBasicAttribute,
            include: basic_associate_1.productBasicInclude,
        });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)()
], ProductRepository);
//# sourceMappingURL=product.repository.js.map