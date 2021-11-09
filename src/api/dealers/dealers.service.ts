import { Injectable } from '@nestjs/common';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Dealer } from './entities/dealer.entity';
import { User } from '../users/entities/user.entitity';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class DealersService {
  constructor(
    @InjectModel(Dealer)
    private dealerModel: typeof Dealer,
  ) {}

  async getCompanies(dealerId: number, justActiveCompanies: boolean) {
    let dealer: Dealer;
    if (justActiveCompanies) {
      dealer = await this.dealerModel.findOne({
        where: {
          id: dealerId,
        },
        include: [
          User,
          {
            model: Company,
            include: [
              {
                model: User,
                where: {
                  active: true,
                },
              },
            ],
          },
        ],
      });
    } else {
      dealer = await this.dealerModel.findOne({
        where: {
          id: dealerId,
        },
        include: [
          User,
          {
            model: Company,
            include: [User],
          },
        ],
      });
    }

    return dealer;
  }

  async create(createDealerDto: CreateDealerDto) {
    return await this.dealerModel.create(createDealerDto, { include: [User] });
  }

  async findAllActive() {
    return await this.dealerModel.findAll({
      include: [
        {
          model: User,
          where: {
            active: true,
          },
        },
      ],
    });
  }

  async findAll() {
    return await this.dealerModel.findAll({
      include: [User],
    });
  }
}
