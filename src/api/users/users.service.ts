import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entitity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { username } });
  }

  async updatePassword(username: string, password: string) {
    await this.userModel.update(
      { password },
      { where: { username }, individualHooks: true },
    );
  }
}
