"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SparepartRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparepartRepository = void 0;
const common_1 = require("@nestjs/common");
const filter_1 = require("../../utils/filter/filter");
const sparepart_associate_1 = require("../../database/associates/sparepart-associate/sparepart-associate");
const sparepart_entity_1 = require("../../database/entities/services/sparepart-entity/sparepart-entity");
let SparepartRepository = SparepartRepository_1 = class SparepartRepository {
    constructor() {
        this.logger = new common_1.Logger(SparepartRepository_1.name);
    }
    async findALl(query, type) {
        let where = {};
        this.logger.log(SparepartRepository_1.name);
        where = (0, filter_1.filter)(query, type);
        return await sparepart_associate_1.sparepartAssociate.findAll({
            where: where,
            attributes: sparepart_associate_1.sparepartAttribute,
            include: sparepart_associate_1.sparepartInclude,
            order: [['id', 'ASC']],
        });
    }
    async findOne(id) {
        this.logger.log(SparepartRepository_1.name);
        return await sparepart_entity_1.sparepartEntity.findOne({
            where: { id },
            attributes: sparepart_associate_1.sparepartAttribute,
            include: sparepart_associate_1.sparepartInclude,
        });
    }
};
exports.SparepartRepository = SparepartRepository;
exports.SparepartRepository = SparepartRepository = SparepartRepository_1 = __decorate([
    (0, common_1.Injectable)()
], SparepartRepository);
//# sourceMappingURL=sparepart-repository.js.map