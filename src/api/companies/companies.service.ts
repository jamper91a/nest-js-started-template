import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { User } from '../users/entities/user.entitity';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company) private companyModel: typeof Company) {}

  async byDealer(dealerId: number, active: boolean) {
    let companies: Company[];
    if (active) {
      companies = await this.companyModel.findAll({
        where: {
          dealerId,
        },
      });
    } else {
      companies = await this.companyModel.findAll({
        where: {
          dealerId,
        },
        include: [User],
      });
    }
  }

  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
