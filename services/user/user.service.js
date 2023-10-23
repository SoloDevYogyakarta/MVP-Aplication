"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../database/entities/authenticates/user-entity/user-entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const lodash_1 = require("lodash");
const system_1 = require("../../utils/system/system");
const env_1 = __importDefault(require("../../utils/env/env"));
const sequelize_1 = require("sequelize");
const file_entity_1 = require("../../database/entities/commons/file-entity/file-entity");
const nanoid_1 = require("nanoid");
let UserService = class UserService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    }
    async login(field) {
        let where = { username: field.token };
        if (this.regex.test(field.token)) {
            where = { email: field.token };
            delete where['username'];
        }
        const findOne = await user_entity_1.userEntity.findOne({ where });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Username or password inccorect',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const check = await bcrypt_1.default.compareSync(field.password, findOne.password);
        if (!check) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Wrong password',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const token = this.jwtService.sign({ data: findOne }, { secret: env_1.default['SECRET'] });
        return { accessToken: token, status: common_1.HttpStatus.OK };
    }
    async create(field) {
        let where = [{ username: '' }, { email: '' }];
        if (field.username) {
            where = [...where, { username: field.username }];
        }
        if (field.email) {
            where = [...where, { email: field.email }];
        }
        const findOne = await user_entity_1.userEntity.findOne({
            where: {
                [sequelize_1.Op.or]: where,
            },
        });
        if (findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Username already exists, please choose another one',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (field.password !== field.confirmation) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Password don't match, please check again",
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const file = await file_entity_1.fileEntity.create({ public_id: (0, nanoid_1.nanoid)() });
        file.save();
        const create = await user_entity_1.userEntity.create((0, lodash_1.omit)({ ...field, file_id: file.public_id }, ['confirmation']));
        (0, system_1.createpath)(`../../../src/database/dataTxt/${'user-service-entity.txt'}`, create);
        create.save();
        return {
            result: create,
            status: common_1.HttpStatus.CREATED,
            message: 'Account has been created',
        };
    }
    async update(public_id, field, file) {
        const findOne = await user_entity_1.userEntity.findOne({ where: { public_id } });
        if (!findOne) {
            throw new common_1.HttpException('false', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const check = await bcrypt_1.default.compareSync(field.password, findOne.password);
        if (!check) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, message: 'Wrong password' }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.username = field.username;
        findOne.save();
        const fileEnt = await file_entity_1.fileEntity.findOne({
            where: { public_id: findOne.file_id },
        });
        if (file?.originalname) {
            fileEnt.filename = file.filename;
            fileEnt.originalname = file.originalname;
            if (fileEnt.filepath) {
                (0, system_1.removepath)(`../..${fileEnt.filepath}`);
            }
            fileEnt.filepath = file.path.split('/src')[1];
            fileEnt.type = file.mimetype.split('/')[0];
            fileEnt.save();
        }
        return { status: common_1.HttpStatus.OK, message: 'Account has been updated' };
    }
    async destroy(public_id) {
        const findOne = await user_entity_1.userEntity.findOne({ where: { public_id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Account not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Account has been deleted' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map