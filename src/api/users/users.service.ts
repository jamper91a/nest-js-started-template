import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entitity';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async update(id: number, dto: UpdateUserDto) {
    return await this.userModel.update(dto, {
      where: { id },
      individualHooks: true,
    });
  }
}
