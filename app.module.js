"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const history_controller_1 = require("./controllers/history-controller/history-controller");
const order_controller_1 = require("./controllers/order-controller/order-controller");
const user_controller_1 = require("./controllers/user-controller/user-controller");
const jwt_strategy_1 = require("./middleware/jwt-strategy/jwt-strategy");
const history_repository_1 = require("./repository/history-repository/history-repository");
const user_repository_1 = require("./repository/user-repository/user-repository");
const history_service_1 = require("./services/history-service/history-service");
const order_service_1 = require("./services/order-service/order-service");
const user_service_1 = require("./services/user-service/user-service");
const environment_1 = require("./utils/environment/environment");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: environment_1.environment['SECRET'],
                signOptions: {
                    expiresIn: '7d',
                },
            }),
        ],
        controllers: [
            user_controller_1.UserController,
            history_controller_1.ServiceHistoryController,
            order_controller_1.ServicesOrderController,
        ],
        providers: [
            user_service_1.UserService,
            user_repository_1.UserRepository,
            jwt_strategy_1.JwtStrategy,
            history_service_1.HistoryService,
            history_repository_1.HistoryRepository,
            order_service_1.OrderService,
        ],
        exports: [user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map