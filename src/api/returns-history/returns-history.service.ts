import { Injectable } from '@nestjs/common';
import { CreateReturnsHistoryDto } from './dto/create-returns-history.dto';
import { UpdateReturnsHistoryDto } from './dto/update-returns-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ReturnHistory } from './entities/returns-history.entity';

@Injectable()
export class ReturnsHistoryService {
  constructor(
    @InjectModel(ReturnHistory)
    private returnsHistoryModel: typeof ReturnHistory,
  ) {}

  create(createReturnsHistoryDto: CreateReturnsHistoryDto) {
    return 'This action adds a new returnsHistory';
  }

  findAll() {
    return `This action returns all returnsHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} returnsHistory`;
  }

  update(id: number, updateReturnsHistoryDto: UpdateReturnsHistoryDto) {
    return `This action updates a #${id} returnsHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} returnsHistory`;
  }
}
