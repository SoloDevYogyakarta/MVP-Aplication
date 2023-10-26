import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import env from './utils/env/env';
import { BookingController } from './controllers/booking/booking.controller';
import { HistoryController } from './controllers/history/history.controller';
import { PromoController } from './controllers/promo/promo.controller';
import { SparepartController } from './controllers/sparepart/sparepart.controller';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repository/user/user.repository';
import { UserService } from './services/user/user.service';
import { LocalStrategy } from './middleware/local.strategy';
import { JwtStrategy } from './middleware/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { HistoryRepository } from './repository/history/history.repository';
import { ProductController } from './controllers/product/product.controller';
import { ProductRepository } from './repository/product/product.repository';
import { ProductService } from './services/product/product.service';
import { ProductPromoService } from './services/promo/promo.service';
import { ProductPromoRepository } from './repository/promo/promo.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { BookingService } from './services/booking/booking.service';
import { BookingRepository } from './repository/booking/booking.repository';
import { HistoryService } from './services/history/history-service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env['SECRET'] || 'token',
      signOptions: { expiresIn: '7d' },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    UserController,
    PromoController,
    HistoryController,
    BookingController,
    SparepartController,
    ProductController,
  ],
  providers: [
    UserRepository,
    UserService,
    LocalStrategy,
    JwtStrategy,
    HistoryRepository,
    HistoryService,
    ProductRepository,
    ProductService,
    ProductPromoRepository,
    ProductPromoService,
    BookingService,
    BookingRepository,
  ],
  exports: [UserService],
})
export class AppModule {}