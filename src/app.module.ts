import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServiceHistoryController } from './controllers/history-controller/history-controller';
import { ServicesOrderController } from './controllers/order-controller/order-controller';
import { PromoController } from './controllers/promo-controller/promo-controller';
import { UserController } from './controllers/user-controller/user-controller';
import { JwtStrategy } from './middleware/jwt-strategy/jwt-strategy';
import { HistoryRepository } from './repository/history-repository/history-repository';
import { PromoRepository } from './repository/promo-repository/promo-repository';
import { UserRepository } from './repository/user-repository/user-repository';
import { HistoryService } from './services/history-service/history-service';
import { OrderService } from './services/order-service/order-service';
import { PromoService } from './services/promo-service/promo-service';
import { UserService } from './services/user-service/user-service';
import { environment } from './utils/environment/environment';

@Module({
  imports: [
    JwtModule.register({
      secret: environment['SECRET'],
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [
    UserController,
    ServiceHistoryController,
    ServicesOrderController,
    PromoController,
  ],
  providers: [
    UserService,
    UserRepository,
    JwtStrategy,
    HistoryService,
    HistoryRepository,
    OrderService,
    PromoService,
    PromoRepository,
  ],
  exports: [UserService],
})
export class AppModule {}
