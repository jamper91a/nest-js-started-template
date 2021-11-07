import { Injectable } from '@nestjs/common';
import { UsersService } from '../api/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './entities/payload';
import { User } from '../api/users/entities/user.entitity';
import { LoginResponseDto } from './entities/responses/login-response.dto';

import * as bcrypt from 'bcryptjs';
import { Constants } from '../util/constants';

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
    const user: User = await this.usersService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      user.setDataValue('password', null);
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    let dealer, employee;
    switch (user.groupId) {
      case Constants.groups.dealer:
        dealer = await user.$get('dealer');
        user.setDataValue('dealer', dealer);
        break;
      case Constants.groups.cashier:
        employee = await user.$get('employee');
        user.setDataValue('employee', employee);
        break;
      case Constants.groups.warehouse:
        employee = await user.$get('employee');
        user.setDataValue('employee', employee);
        break;
      case Constants.groups.admin:
        employee = await user.$get('company');
        user.setDataValue('company', employee);
        break;
    }

    const payload: Payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async updatePassword(username: string, password: string) {
    const user = await this.usersService.updatePassword(username, password);
  }
}
