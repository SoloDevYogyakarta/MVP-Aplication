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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = require("lodash");
const user_entity_1 = require("../../database/entities/authenticate/user-entity/user-entity");
const environment_1 = require("../../utils/environment/environment");
const jwt_1 = require("@nestjs/jwt");
const history_entity_1 = require("../../database/entities/authenticate/history-entity/history-entity");
let UserService = UserService_1 = class UserService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async login(body) {
        this.logger.log(UserService_1.name);
        const findOne = await user_entity_1.userEntity.findOne({
            where: { plat_number: body.token },
        });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Invalid username or password',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const check = await bcrypt_1.default.compareSync(body.password, findOne.password);
        if (!check) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Invalid username or password',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.is_active = true;
        findOne.save();
        const access_token = this.jwtService.sign({
            data: JSON.parse(JSON.stringify(findOne)),
        }, { secret: environment_1.environment['SECRET'] });
        return { status: common_1.HttpStatus.OK, access_token };
    }
    async create(body) {
        this.logger.log(UserService_1.name);
        const findOne = await user_entity_1.userEntity.findOne({
            where: { plat_number: body.plat_number },
        });
        if (findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Plat number already exists',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (body.password !== body.confirmation) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Password don't match, please check again",
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const create = await user_entity_1.userEntity.create((0, lodash_1.omit)({ ...body, password: await bcrypt_1.default.hashSync(body.password, 15) }, [
            'confirmation',
        ]));
        create.save();
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'Account has been create',
            result: create,
        };
    }
    async update(id, body) {
        const findOne = await user_entity_1.userEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Account not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const history = await history_entity_1.userHistoryEntity.create({
            ...(0, lodash_1.omit)(JSON.parse(JSON.stringify(findOne)), [
                'id',
                'public_id',
                'role',
                'password',
                'createdAt',
                'updatedAt',
            ]),
            user_id: findOne.id,
        });
        history.save();
        findOne.update((0, lodash_1.omit)(body, ['motor', 'year_production', 'password', 'confirmation']), { where: { id } });
        return { status: common_1.HttpStatus.OK, message: 'Account has been update' };
    }
    async changePassword(id, body) {
        const findOne = await user_entity_1.userEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'false',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const check = await bcrypt_1.default.compareSync(body.old_password, findOne.password);
        if (!check) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Wrong password',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (body.password !== body.confirmation) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: "Password don't match, please check again",
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        findOne.password = await bcrypt_1.default.hashSync(body.password, 15);
        findOne.save();
        return { status: common_1.HttpStatus.OK, message: 'Password has been update' };
    }
    async destroy(id) {
        const findOne = await user_entity_1.userEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Account not found',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const history = await history_entity_1.userHistoryEntity.findAll({
            where: { user_id: findOne.id },
        });
        for (const values of history) {
            values?.destroy();
        }
        findOne.destroy();
        return { status: common_1.HttpStatus.OK, message: 'Account has been delete' };
    }
    async logout(id) {
        const findOne = await user_entity_1.userEntity.findOne({ where: { id } });
        if (!findOne) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'false',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        findOne.is_active = false;
        findOne.save();
        return { message: true, findOne };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user-service.js.map