"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const env_1 = __importDefault(require("./utils/env/env"));
const booking_controller_1 = require("./controllers/booking/booking.controller");
const history_controller_1 = require("./controllers/history/history.controller");
const promo_controller_1 = require("./controllers/promo/promo.controller");
const sparepart_controller_1 = require("./controllers/sparepart/sparepart.controller");
const user_controller_1 = require("./controllers/user/user.controller");
const user_repository_1 = require("./repository/user/user.repository");
const user_service_1 = require("./services/user/user.service");
const local_strategy_1 = require("./middleware/local.strategy");
const jwt_strategy_1 = require("./middleware/jwt.strategy");
const passport_1 = require("@nestjs/passport");
const history_repository_1 = require("./repository/history/history.repository");
const product_controller_1 = require("./controllers/product/product.controller");
const product_repository_1 = require("./repository/product/product.repository");
const product_service_1 = require("./services/product/product.service");
const promo_service_1 = require("./services/promo/promo.service");
const promo_repository_1 = require("./repository/promo/promo.repository");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: env_1.default['SECRET'] || 'token',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        controllers: [
            user_controller_1.UserController,
            promo_controller_1.PromoController,
            history_controller_1.HistoryController,
            booking_controller_1.BookingController,
            sparepart_controller_1.SparepartController,
            product_controller_1.ProductController,
        ],
        providers: [
            user_repository_1.UserRepository,
            user_service_1.UserService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            history_repository_1.HistoryRepository,
            product_repository_1.ProductRepository,
            product_service_1.ProductService,
            promo_repository_1.ProductPromoRepository,
            promo_service_1.ProductPromoService,
        ],
        exports: [user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map