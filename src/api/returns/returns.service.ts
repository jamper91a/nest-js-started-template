import { Injectable } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Return } from './entities/return.entity';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectModel(Return)
    private returnModel: typeof Return,
  ) {}

  create(createReturnDto: CreateReturnDto) {
    return 'This action adds a new return';
  }

  findAll() {
    return `This action returns all returns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} return`;
  }

  update(id: number, updateReturnDto: UpdateReturnDto) {
    return `This action updates a #${id} return`;
  }

  remove(id: number) {
    return `This action removes a #${id} return`;
  }
}
