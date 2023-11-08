"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HistoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const order_entity_1 = require("../../database/entities/services/order-entity/order-entity");
const user_entity_1 = require("../../database/entities/authenticate/user-entity/user-entity");
const history_entity_1 = require("../../database/entities/services/history-entity/history-entity");
const files_entity_1 = require("../../database/entities/services/files-entity/files-entity");
const system_1 = require("../../utils/system/system");
let HistoryService = HistoryService_1 = class HistoryService {
    constructor() {
        this.logger = new common_1.Logger(HistoryService_1.name);
    }
    async create(id, orderBody, body, files) {
        this.logger.log(HistoryService_1.name);
        let ids = [];
        const findOne = await user_entity_1.userEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Account not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const order = await order_entity_1.orderEntity.create({
            name: orderBody.name,
            desc: orderBody.desc,
            createdAt: orderBody.date,
            user_id: findOne.id,
        });
        order.save();
        for (const values of body) {
            if ((0, lodash_1.some)((0, lodash_1.omit)(values, ['id', 'file_desc', 'browse']))) {
                const create = await history_entity_1.historyEntity.create({
                    ...(0, lodash_1.omit)(values, ['id', 'file_desc', 'browse']),
                    order_id: order.id,
                });
                create.save();
                ids.push(create.id);
            }
        }
        for (const [index, file] of files.entries()) {
            const filepath = `/assets${file.path.split('/assets')[1]}`;
            const f = await files_entity_1.fileEntity.create({
                originalname: file.originalname,
                type: file.mimetype.split('/')[1],
                filepath,
                order_id: order.id,
                desc: body[index]?.file_desc,
                browse: body[index]?.browse,
            });
            f.save();
        }
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'History has been added',
            result: order,
            ids,
            findOne,
        };
    }
    async update(id, desc, body, files) {
        const findOne = await order_entity_1.orderEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, message: 'Order not found' }, common_1.HttpStatus.BAD_REQUEST);
        }
        for (const values of body) {
            const history = await history_entity_1.historyEntity.findOne({
                where: { order_id: findOne.id, id: values.id },
            });
            if (!history) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    message: 'History not found',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            history.update((0, lodash_1.omit)(values, ['id', 'file_desc', 'browse']), {
                where: { id: values.id },
            });
        }
        if (files?.length) {
            const fAll = await files_entity_1.fileEntity.findAll({
                where: { order_id: findOne.id },
            });
            for (const values of fAll) {
                if (values.filepath) {
                    try {
                        (0, system_1.removepath)(`../..${values.filepath}`);
                    }
                    catch (err) {
                    }
                }
                values.destroy();
            }
            for (const [index, file] of files.entries()) {
                const filepath = `/assets${file.path.split('/assets')[1]}`;
                const f = await files_entity_1.fileEntity.create({
                    originalname: file.originalname,
                    type: file.mimetype.split('/')[1],
                    filepath,
                    order_id: findOne.id,
                    desc: body[index]?.file_desc,
                    browse: body[index]?.browse,
                });
                f.save();
            }
        }
        findOne.update({ desc }, { where: { id } });
        return { status: common_1.HttpStatus.OK, message: 'History has been update' };
    }
    async destroy(id) {
        const findOne = await history_entity_1.historyEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'History not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'History has been delete' };
    }
};
exports.HistoryService = HistoryService;
exports.HistoryService = HistoryService = HistoryService_1 = __decorate([
    (0, common_1.Injectable)()
], HistoryService);
//# sourceMappingURL=history-service.js.map