"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getfield = void 0;
const system_1 = require("../system/system");
function getfield(filename) {
    try {
        const inc = ['fake', 'token', 'token_member'];
        if (inc.includes(filename)) {
            return (0, system_1.readpath)(`../folder-text/${filename}.txt`);
        }
        return JSON.parse((0, system_1.readpath)(`../folder-text/${filename}.txt`));
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.getfield = getfield;
//# sourceMappingURL=get-field.js.map