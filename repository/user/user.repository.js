"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const dynamic_filter_1 = require("../../utils/dynamic-filter/dynamic-filter");
const user_associate_1 = require("../../database/associates/user-associate/user-associate");
let UserRepository = class UserRepository {
    async findAll(query) {
        let where = {}, datas = [];
        where = (0, dynamic_filter_1.dynamicFilter)(where, datas, query);
        const result = await user_associate_1.userAssociate.findAll({
            where: where,
            include: user_associate_1.userInclude,
            order: [['createdAt', 'DESC']],
        });
        return result;
    }
    async findOne(public_id) {
        const result = await user_associate_1.userAssociate.findOne({
            where: { public_id },
            include: user_associate_1.userInclude,
        });
        return result;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)()
], UserRepository);
//# sourceMappingURL=user.repository.js.map