import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { CompanyExceptions } from './exceptions/company.exceptions';
import { FilesService } from '../../util/files.service';
import { PdfModule } from '../../services/pdf/pdf.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CompanyExceptions, FilesService],
  imports: [SequelizeModule.forFeature([Company]), PdfModule],
  exports: [CompaniesService],
})
export class CompaniesModule {}
