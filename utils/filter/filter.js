"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
const sequelize_1 = require("sequelize");
const lodash_1 = require("lodash");
function filter(query, type) {
    let result = {}, opType;
    switch (type) {
        case 'string':
            opType = sequelize_1.Op.substring;
            break;
        case 'number':
            opType = sequelize_1.Op.eq;
            break;
        case '<':
            opType = sequelize_1.Op.lt;
            break;
        case '<=':
            opType = sequelize_1.Op.lte;
            break;
        case '>':
            opType = sequelize_1.Op.gt;
            break;
        case '>=':
            opType = sequelize_1.Op.gte;
            break;
    }
    Object.keys((0, lodash_1.omit)(query, ['type'])).filter((keyName) => {
        result = {
            [keyName]: {
                [opType]: type === 'number' ? Number(query[keyName]) : query[keyName],
            },
        };
    });
    return result;
}
exports.filter = filter;
//# sourceMappingURL=filter.js.map