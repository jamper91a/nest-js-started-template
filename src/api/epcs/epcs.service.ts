import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Epc } from './entities/epc.entity';
import { CreateEpcDto } from './dto/create-epc.dto';
import { EpcExceptions } from './exceptions/epc.exceptions';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class EpcsService {
  constructor(
    @InjectModel(Epc)
    private epcModel: typeof Epc,
    private sequelize: Sequelize,
    private exceptions: EpcExceptions,
  ) {}

  async createSeveral(createEpcDto: CreateEpcDto) {
    return await this.sequelize.transaction(async (transaction) => {
      try {
        return await this.epcModel.bulkCreate(createEpcDto.epcs, {
          individualHooks: true,
          transaction,
        });
      } catch (e) {
        throw e;
      }
    });
  }
}
