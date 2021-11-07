import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Constants } from '../../util/constants';
import { UserAuth } from '../entities/user-auth';
import { Payload } from '../entities/payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: Constants.auth.jwt.secret,
    });
  }

  /**
   * This data will be the 'user' object of the request
   * @param payload
   */
  async validate(payload: Payload): Promise<UserAuth> {
    return { user: payload.user };
  }
}
