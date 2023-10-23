"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diskStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const nanoid_1 = require("nanoid");
const system_1 = require("../system/system");
exports.diskStorage = multer_1.default.diskStorage({
    filename(req, file, callback) {
        callback(null, `${(0, nanoid_1.nanoid)()}.${file.mimetype.split('/')[1]}`);
    },
    destination(req, file, cb) {
        cb(null, (0, system_1.joinpath)('../../assets'));
    },
});
//# sourceMappingURL=multer.js.map