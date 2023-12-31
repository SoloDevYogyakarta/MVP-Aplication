import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userEntity } from '../../database/entities/authenticate/user-entity/user-entity';
import { environment } from '../../utils/environment/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extraTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: environment['SECRET'],
    });
    request['user'] = payload;
    const findOne = await userEntity.findOne({
      where: { id: payload.data.id },
    });
    if (!findOne.is_active) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extraTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
