"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRepository = void 0;
const common_1 = require("@nestjs/common");
const dynamic_filter_1 = require("../../utils/dynamic-filter/dynamic-filter");
let HistoryRepository = class HistoryRepository {
    async findOne(public_id) {
        return 'OK';
    }
    async findAll(query) {
        let where = {}, datas = [];
        (0, dynamic_filter_1.dynamicFilter)(where, datas, query);
        return 'OK';
    }
};
exports.HistoryRepository = HistoryRepository;
exports.HistoryRepository = HistoryRepository = __decorate([
    (0, common_1.Injectable)()
], HistoryRepository);
//# sourceMappingURL=history.repository.js.map