import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company) private companyModel: typeof Company) {}

  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  async findCompanyByUserId(userId: number) {
    return await this.companyModel.findOne({ where: { userId } });
  }

  findAll() {
    return `This action returns all companies`;
  }

  async findOne(id: number) {
    return await this.companyModel.findOne({ where: { id } });
  }

  async findOneByDealer(id: number, dealerId) {
    return await this.companyModel.findOne({ where: { id, dealerId } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyModel.update(updateCompanyDto, {
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
