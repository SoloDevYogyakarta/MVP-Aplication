"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPromoService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../database/entities/authenticates/user-entity/user-entity");
const basic_entity_1 = require("../../database/entities/products/basic-entity/basic-entity");
const lodash_1 = require("lodash");
const promo_entity_1 = require("../../database/entities/products/promo-entity/promo-entity");
const system_1 = require("../../utils/system/system");
let ProductPromoService = class ProductPromoService {
    async create(body, user_id) {
        await this.isAdmin(user_id);
        const findOne = await basic_entity_1.productBasicEntity.findOne({
            where: { public_id: body.product_id },
        });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Product not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const create = await promo_entity_1.productPromoEntity.create(body);
        create.save();
        (0, system_1.createpath)('../../database/dataTxt/promo-http-entity.txt', create);
        return { status: common_1.HttpStatus.CREATED, message: 'Promo has been create' };
    }
    async update(body, public_id, user_id) {
        await this.isAdmin(user_id);
        const findOne = await promo_entity_1.productPromoEntity.findOne({ where: { public_id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Promo not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        findOne.update((0, lodash_1.omit)(body, ['product_id']), { where: { public_id } });
        return { status: common_1.HttpStatus.OK, message: 'Promo has been update' };
    }
    async destroy(public_id, user_id) {
        await this.isAdmin(user_id);
        const findOne = await promo_entity_1.productPromoEntity.findOne({ where: { public_id } });
        if (!findOne) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.NOT_FOUND, message: 'Promo not found' }, common_1.HttpStatus.NOT_FOUND);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Promo has been delete' };
    }
    async isAdmin(public_id) {
        const findOne = await user_entity_1.userEntity.findOne({ where: { public_id } });
        if (findOne?.role !== 'admin') {
            throw new common_1.HttpException('false', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductPromoService = ProductPromoService;
exports.ProductPromoService = ProductPromoService = __decorate([
    (0, common_1.Injectable)()
], ProductPromoService);
//# sourceMappingURL=promo.service.js.map