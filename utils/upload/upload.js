"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOptions = void 0;
const multer_1 = __importDefault(require("multer"));
const nanoid_1 = require("nanoid");
const system_1 = require("../system/system");
exports.uploadOptions = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, (0, system_1.joinpath)('../../assets'));
    },
    filename(req, file, callback) {
        callback(null, `${(0, nanoid_1.nanoid)()}.${file.mimetype.split('/')[1]}`);
    },
});
//# sourceMappingURL=upload.js.map