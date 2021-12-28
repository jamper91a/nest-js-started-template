import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Epc } from './entities/epc.entity';
import { CreateEpcDto } from './dto/create-epc.dto';
import { EpcExceptions } from './exceptions/epc.exceptions';
import { Sequelize } from 'sequelize-typescript';
import { col, fn, Transaction } from 'sequelize';
import { EpcStates } from './entities/epc-state.entity';

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

  async findOneByCodeAndCompany(code: string, companyId: number) {
    return await this.epcModel.findOne({
      where: {
        code,
        companyId,
      },
    });
  }

  async findEpcsByCompanyIdMonthly(companyId: number, dealerId: number) {
    return await this.epcModel.findAll({
      attributes: [
        [fn('COUNT', '1'), 'amount'], // COUNT(1) AS amount
        [fn('DAY', col('createdAt')), 'day'], // DAY(createdAt) AS day
        [fn('MONTHNAME', col('createdAt')), 'month'], //MONTHNAME(createdAt) AS month
      ],
      where: {
        dealerId,
        companyId,
      },
      group: [
        fn('MONTHNAME', col('createdAt')),
        fn('DAY', col('createdAt')),
        fn('MONTH', col('createdAt')),
      ],
      order: [fn('MONTH', col('createdAt')), fn('DAY', col('createdAt'))],
    });
  }

  async findEpcsByDealerMonthly(dealerId: number) {
    return await this.epcModel.findAll({
      attributes: [
        [fn('COUNT', '1'), 'amount'], // COUNT(1) AS amount
        [fn('DAY', col('createdAt')), 'day'], // DAY(createdAt) AS day
        [fn('MONTHNAME', col('createdAt')), 'month'], //MONTHNAME(createdAt) AS month
      ],
      where: {
        dealerId,
      },
      group: [
        fn('MONTHNAME', col('createdAt')),
        fn('DAY', col('createdAt')),
        fn('MONTH', col('createdAt')),
      ],
      order: [fn('MONTH', col('createdAt')), fn('DAY', col('createdAt'))],
    });
  }

  async findNoAssignEpcByCode(
    codes: string[],
    companyId: number,
    transaction?: Transaction,
  ) {
    return await this.epcModel.findAll({
      where: {
        code: codes,
        companyId,
        state: EpcStates.NOT_ASSIGNED,
      },
      transaction,
    });
  }

  async updateState(
    epcsId: number[],
    state: EpcStates,
    transaction: Transaction,
  ): Promise<Epc[]> {
    const result = await this.epcModel.update(
      { state },
      {
        where: {
          id: epcsId,
        },
        transaction,
        returning: true,
      },
    );
    return result[1];
  }
}
