"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const basic_entity_1 = require("../../database/entities/products/basic-entity/basic-entity");
const lodash_1 = require("lodash");
const system_1 = require("../../utils/system/system");
const price_entity_1 = require("../../database/entities/products/price-entity/price-entity");
const stock_entity_1 = require("../../database/entities/products/stock-entity/stock-entity");
const image_size_1 = __importDefault(require("image-size"));
const file_entity_1 = require("../../database/entities/commons/file-entity/file-entity");
const join_entity_1 = require("../../database/entities/commons/join-entity/join-entity");
const nanoid_1 = require("nanoid");
let ProductService = class ProductService {
    async create(body, user_id, files) {
        const create = await basic_entity_1.productBasicEntity.create((0, lodash_1.pick)({ ...body, user_id }, [
            'name',
            'status',
            'condition',
            'shortdesc',
            'main_stock',
            'reserve_stock',
            'user_id',
        ]));
        create.save();
        const dataPrice = typeof body.price === 'string' ? JSON.parse(body.price) : body.price;
        const price = await price_entity_1.productpriceEntity.create((0, lodash_1.pick)({ ...dataPrice, product_id: create.public_id }, [
            'value',
            'currency',
            'product_id',
        ]));
        const dataStock = typeof body.stock === 'string' ? JSON.parse(body.stock) : body.stock;
        const stock = await stock_entity_1.productStockEntity.create({
            ...dataStock,
            product_id: create.public_id,
        });
        stock.save();
        price.save();
        (0, system_1.createpath)('../../database/dataTxt/basic-http-entity.txt', create);
        if (files.length) {
            for (const file of files) {
                file.path = file.path.split('/src')[1];
                const f = await file_entity_1.fileEntity.create({
                    public_id: (0, nanoid_1.nanoid)(),
                    ...file,
                    filepath: file.path,
                    ...(0, image_size_1.default)((0, system_1.joinpath)(`../../assets/${file.filename}`)),
                });
                f.save();
                const join = await join_entity_1.joinEntity.create({
                    source_id: create.public_id,
                    foreign_id: f.public_id,
                });
                join.save();
            }
        }
        return { status: common_1.HttpStatus.CREATED, message: 'Product has been create' };
    }
    async update(body, public_id, files) {
        const findOne = await basic_entity_1.productBasicEntity.findOne({ where: { public_id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not Found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        findOne.update((0, lodash_1.pick)(body, [
            'name',
            'status',
            'condition',
            'shortdesc',
            'main_stock',
            'reserve_stock',
        ]), { where: { public_id } });
        await price_entity_1.productpriceEntity.update(typeof body.price === 'string' ? JSON.parse(body.price) : body.price, {
            where: { product_id: findOne.public_id },
        });
        await stock_entity_1.productStockEntity.update(typeof body.stock === 'string' ? JSON.parse(body.stock) : body.stock, {
            where: { product_id: findOne.public_id },
        });
        if (files.length) {
            for (const file of files) {
                const join = await join_entity_1.joinEntity.findOne({
                    where: { source_id: findOne.public_id },
                });
                const f = await file_entity_1.fileEntity.findOne({
                    where: { public_id: join.foreign_id },
                });
                if (f.filepath) {
                    try {
                        (0, system_1.removepath)(`../..${f.filepath}`);
                    }
                    catch (err) {
                    }
                }
                f.destroy();
                join.destroy();
                file.path = file.path.split('/src')[1];
                const cf = await file_entity_1.fileEntity.create({
                    ...file,
                    filepath: file.path,
                    ...(0, image_size_1.default)((0, system_1.joinpath)(`../../assets/${file.filename}`)),
                });
                cf.save();
                const cj = await join_entity_1.joinEntity.create({
                    source_id: findOne.public_id,
                    foreign_id: cf.public_id,
                });
                cj.save();
            }
        }
        return { status: common_1.HttpStatus.OK, message: 'Product has been update' };
    }
    async destroy(public_id) {
        const findOne = await basic_entity_1.productBasicEntity.findOne({ where: { public_id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not Found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await price_entity_1.productpriceEntity.destroy({
            where: { product_id: findOne.public_id },
        });
        await stock_entity_1.productStockEntity.destroy({
            where: { product_id: findOne.public_id },
        });
        const joins = await join_entity_1.joinEntity.findAll({
            where: { source_id: findOne.public_id },
        });
        if (joins.length) {
            for (const join of joins) {
                const file = await file_entity_1.fileEntity.findOne({
                    where: { public_id: join.foreign_id },
                });
                if (file.filepath) {
                    try {
                        (0, system_1.removepath)(`../..${file.filepath}`);
                    }
                    catch (err) {
                    }
                }
                file.destroy();
                join.destroy();
            }
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Product has been delete' };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)()
], ProductService);
//# sourceMappingURL=product.service.js.map