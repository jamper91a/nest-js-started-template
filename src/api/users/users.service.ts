import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<UserEntity | undefined> {
    return null;
  }
}
