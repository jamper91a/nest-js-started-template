import { Injectable } from '@nestjs/common';
import { CreateReturnsHistoryDto } from './dto/create-returns-history.dto';
import { UpdateReturnsHistoryDto } from './dto/update-returns-history.dto';

@Injectable()
export class ReturnsHistoryService {
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
