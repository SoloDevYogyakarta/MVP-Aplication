import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controllers/user-controller/user-controller';
import { JwtStrategy } from './middleware/jwt-strategy/jwt-strategy';
import { UserRepository } from './repository/user-repository/user-repository';
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
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy],
  exports: [UserService],
})
export class AppModule {}
