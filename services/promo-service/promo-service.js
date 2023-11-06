"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PromoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoService = void 0;
const common_1 = require("@nestjs/common");
const system_1 = require("../../utils/system/system");
const promo_entity_1 = require("../../database/entities/services/promo-entity/promo-entity");
let PromoService = PromoService_1 = class PromoService {
    constructor() {
        this.logger = new common_1.Logger(PromoService_1.name);
    }
    async create(user_id, body, file) {
        this.logger.log(PromoService_1.name);
        let image = null;
        const findOne = await promo_entity_1.promoEntity.findOne({ where: { name: body.name } });
        if (findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Promo name already exists',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (file?.path) {
            image = `/assets${file.path.split('/assets')[1]}`;
        }
        const create = await promo_entity_1.promoEntity.create({ ...body, image, user_id });
        create.save();
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'Promo has been create',
            create,
        };
    }
    async update(id, body, file) {
        this.logger.log(PromoService_1.name);
        const findOne = await promo_entity_1.promoEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Promo not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (file?.path) {
            const image = `/assets${file.path.split('/assets')[1]}`;
            if (findOne.image) {
                try {
                    (0, system_1.removepath)(`../..${findOne.image}`);
                }
                catch (err) {
                }
            }
            findOne.image = image;
            findOne.save();
        }
        findOne.update(body, { where: { id } });
        return { status: common_1.HttpStatus.OK, message: 'Promo has been update' };
    }
    async destroy(id) {
        this.logger.log(PromoService_1.name);
        const findOne = await promo_entity_1.promoEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Promo not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (findOne.image) {
            try {
                (0, system_1.removepath)(`../..${findOne.image}`);
            }
            catch (err) {
            }
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Promo has been delete' };
    }
};
exports.PromoService = PromoService;
exports.PromoService = PromoService = PromoService_1 = __decorate([
    (0, common_1.Injectable)()
], PromoService);
//# sourceMappingURL=promo-service.js.map