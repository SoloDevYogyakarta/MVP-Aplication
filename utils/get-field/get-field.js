"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getField = void 0;
const system_1 = require("../system/system");
function getField(filename) {
    try {
        const inc = ['token', 'fake'];
        if (inc.includes(filename)) {
            return (0, system_1.readpath)(`../../database/dataTxt/${filename}.txt`);
        }
        return JSON.parse((0, system_1.readpath)(`../../database/dataTxt/${filename}.txt`));
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.getField = getField;
//# sourceMappingURL=get-field.js.map