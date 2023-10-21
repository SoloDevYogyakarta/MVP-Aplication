import { Module } from '@nestjs/common';
import { BookingController } from './controllers/booking/booking.controller';
import { HistoryController } from './controllers/history/history.controller';
import { PromoController } from './controllers/promo/promo.controller';
import { SparepartController } from './controllers/sparepart/sparepart.controller';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repository/user/user.repository';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    PromoController,
    HistoryController,
    BookingController,
    SparepartController,
  ],
  providers: [UserRepository, UserService],
})
export class AppModule {}
