import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import env from '../utils/env/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env['SECRET'],
    } as Partial<StrategyOptions>);
  }

  async validate(payload: any) {
    return payload;
  }
}
