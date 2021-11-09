import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Constants } from '../../util/constants';
import { TokenAuthEntity, UserAuth } from '../entities/user-auth';
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
  async validate(payload: Payload): Promise<TokenAuthEntity> {
    const employee = payload.user.employee;
    const company = payload.user.company;
    const dealer = payload.user.dealer;
    const user: UserAuth = new UserAuth();
    user.parse(payload.user);
    return {
      user,
      employee,
      company,
      dealer,
    };
  }
}
