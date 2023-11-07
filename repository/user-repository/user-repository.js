"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const filter_1 = require("../../utils/filter/filter");
const user_associate_1 = require("../../database/associates/user-associate/user-associate");
let UserRepository = UserRepository_1 = class UserRepository {
    constructor() {
        this.logger = new common_1.Logger(UserRepository_1.name);
    }
    async findAll(query, type) {
        let where = {};
        this.logger.log(UserRepository_1.name);
        where = (0, filter_1.filter)(query, type);
        return await user_associate_1.userAssociate.findAll({
            where: where,
            attributes: user_associate_1.userAttribute,
            include: user_associate_1.userInclude,
            order: [['id', 'ASC']],
        });
    }
    async findOne(id) {
        this.logger.log(UserRepository_1.name);
        return await user_associate_1.userAssociate.findOne({
            where: { id },
            attributes: user_associate_1.userAttribute,
            include: user_associate_1.userInclude,
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = UserRepository_1 = __decorate([
    (0, common_1.Injectable)()
], UserRepository);
//# sourceMappingURL=user-repository.js.map