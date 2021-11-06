import { Injectable } from '@nestjs/common';
import { CreateSellsHistoryDto } from './dto/create-sells-history.dto';
import { UpdateSellsHistoryDto } from './dto/update-sells-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SellsHistory } from './entities/sells-history.entity';

@Injectable()
export class SellsHistoryService {
  constructor(
    @InjectModel(SellsHistory)
    private sellModel: typeof SellsHistory,
  ) {}

  create(createSellsHistoryDto: CreateSellsHistoryDto) {
    return 'This action adds a new sellsHistory';
  }

  findAll() {
    return `This action returns all sellsHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellsHistory`;
  }

  update(id: number, updateSellsHistoryDto: UpdateSellsHistoryDto) {
    return `This action updates a #${id} sellsHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellsHistory`;
  }
}
