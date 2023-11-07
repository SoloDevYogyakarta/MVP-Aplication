"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SparepartService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparepartService = void 0;
const common_1 = require("@nestjs/common");
const free_text_entity_1 = require("../../database/entities/public/free-text-entity/free-text-entity");
const sparepart_entity_1 = require("../../database/entities/services/sparepart-entity/sparepart-entity");
let SparepartService = SparepartService_1 = class SparepartService {
    constructor() {
        this.logger = new common_1.Logger(SparepartService_1.name);
    }
    async create(body) {
        this.logger.log(SparepartService_1.name);
        let free;
        const create = await sparepart_entity_1.sparepartEntity.create();
        create.save();
        for (const values of body) {
            const freeText = await free_text_entity_1.freeTextEntity.create({
                ...values,
                sparepart_id: create.id,
            });
            freeText.save();
            free = freeText;
        }
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'Sparepart has been create',
            create,
            free,
        };
    }
    async update(id, body) {
        this.logger.log(SparepartService_1.name);
        const findOne = await sparepart_entity_1.sparepartEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Sparepart not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        for (const values of body) {
            const free = await free_text_entity_1.freeTextEntity.findOne({ where: { id: values.id } });
            if (!free) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Free text not found',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            free.text = values.text;
            free.save();
        }
        return { status: common_1.HttpStatus.OK, message: 'Sparepart has been update' };
    }
    async destroy(id) {
        this.logger.log(SparepartService_1.name);
        const findOne = await sparepart_entity_1.sparepartEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Sparepart not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Sparepart has been delete' };
    }
    async freeDestroy(id) {
        const findOne = await free_text_entity_1.freeTextEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Free text not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Free text has been delete' };
    }
};
exports.SparepartService = SparepartService;
exports.SparepartService = SparepartService = SparepartService_1 = __decorate([
    (0, common_1.Injectable)()
], SparepartService);
//# sourceMappingURL=sparepart-service.js.map