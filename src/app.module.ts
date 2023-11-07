import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { BookingController } from './controllers/booking-controller/booking-controller';
import { ServiceHistoryController } from './controllers/history-controller/history-controller';
import { ServicesOrderController } from './controllers/order-controller/order-controller';
import { PromoController } from './controllers/promo-controller/promo-controller';
import { SparepartController } from './controllers/sparepart-controller/sparepart-controller';
import { UserController } from './controllers/user-controller/user-controller';
import { JwtStrategy } from './middleware/jwt-strategy/jwt-strategy';
import { BookingRepository } from './repository/booking-repository/booking-repository';
import { HistoryRepository } from './repository/history-repository/history-repository';
import { PromoRepository } from './repository/promo-repository/promo-repository';
import { SparepartRepository } from './repository/sparepart-repository/sparepart-repository';
import { UserRepository } from './repository/user-repository/user-repository';
import { BookingService } from './services/booking-service/booking-service';
import { HistoryService } from './services/history-service/history-service';
import { OrderService } from './services/order-service/order-service';
import { PromoService } from './services/promo-service/promo-service';
import { SparepartService } from './services/sparepart-service/sparepart-service';
import { UserService } from './services/user-service/user-service';
import { environment } from './utils/environment/environment';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    BookingController,
    SparepartController,
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
    BookingRepository,
    BookingService,
    SparepartService,
    SparepartRepository,
  ],
  exports: [UserService],
})
export class AppModule {}
