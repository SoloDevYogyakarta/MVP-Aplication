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

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env['SECRET'] || 'token',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    UserController,
    PromoController,
    HistoryController,
    BookingController,
    SparepartController,
  ],
  providers: [UserRepository, UserService, LocalStrategy, JwtStrategy],
  exports: [UserService],
})
export class AppModule {}
