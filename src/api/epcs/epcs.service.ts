import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Epc } from './entities/epc.entity';
import { Sequelize } from 'sequelize-typescript';
import { CreateEpcDto } from './dto/create-epc.dto';

@Injectable()
export class EpcsService {
  constructor(
    @InjectModel(Epc)
    private epcModel: typeof Epc,
    private sequelize: Sequelize,
  ) {}

  async createSeveral(createEpcDto: CreateEpcDto) {
    return await this.sequelize.transaction(async (transaction) => {
      return await this.epcModel.bulkCreate(createEpcDto.epcs, {
        individualHooks: true,
        transaction,
      });
    });
  }
}
