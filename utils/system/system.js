"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removepath = exports.readpath = exports.createpath = exports.joinpath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
function joinpath(path) {
    return (0, path_1.join)(__dirname, path);
}
exports.joinpath = joinpath;
function createpath(path, data) {
    if (typeof data !== 'string') {
        data = JSON.stringify(data);
    }
    fs_1.default.writeFileSync(joinpath(path), data);
}
exports.createpath = createpath;
function readpath(path) {
    return fs_1.default.readFileSync(joinpath(path), { encoding: 'utf-8' });
}
exports.readpath = readpath;
function removepath(path) {
    fs_1.default.unlinkSync(joinpath(path));
}
exports.removepath = removepath;
//# sourceMappingURL=system.js.map