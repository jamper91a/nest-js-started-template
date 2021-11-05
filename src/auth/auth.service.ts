import { Injectable } from '@nestjs/common';
import { UsersService } from '../api/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './entities/payload';
import { User } from '../api/users/entities/user.entitity';
import { LoginResponseDto } from './entities/responses/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * This function is used by the local.strategy
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOne(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload: Payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
