import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { CompanyExceptions } from './exceptions/company.exceptions';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CompanyExceptions],
  imports: [SequelizeModule.forFeature([Company])],
})
export class CompaniesModule {}
