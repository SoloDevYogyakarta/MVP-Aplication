"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicFilter = void 0;
const sequelize_1 = require("sequelize");
const lodash_1 = require("lodash");
function dynamicFilter(where, datas, query) {
    Object.keys(query).filter((key) => {
        datas = [...datas, { [key]: { [sequelize_1.Op.substring]: query[key] } }];
    });
    if ((0, lodash_1.some)(query)) {
        where = { [sequelize_1.Op.or]: datas };
    }
    return where;
}
exports.dynamicFilter = dynamicFilter;
//# sourceMappingURL=dynamic-filter.js.map