"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleField = exports.ResetField = exports.RegisterField = exports.LoginField = void 0;
const class_validator_1 = require("class-validator");
class LoginField {
}
exports.LoginField = LoginField;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginField.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginField.prototype, "password", void 0);
class RegisterField {
}
exports.RegisterField = RegisterField;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterField.prototype, "plat_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterField.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterField.prototype, "confirmation", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], RegisterField.prototype, "http", void 0);
class ResetField {
}
exports.ResetField = ResetField;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetField.prototype, "email", void 0);
class UpdateRoleField {
}
exports.UpdateRoleField = UpdateRoleField;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRoleField.prototype, "public_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRoleField.prototype, "role", void 0);
//# sourceMappingURL=user.validator.js.map