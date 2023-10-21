import { Module } from '@nestjs/common';
import { BookingController } from './controllers/booking/booking.controller';
import { HistoryController } from './controllers/history/history.controller';
import { PromoController } from './controllers/promo/promo.controller';
import { SparepartController } from './controllers/sparepart/sparepart.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [],
  controllers: [
    UserController,
    PromoController,
    HistoryController,
    BookingController,
    SparepartController,
  ],
  providers: [],
})
export class AppModule {}
