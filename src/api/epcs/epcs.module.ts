import { Module } from '@nestjs/common';
import { EpcsService } from './epcs.service';
import { EpcsController } from './epcs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Epc } from './entities/epc.entity';
import { CompaniesModule } from '../companies/companies.module';
import { EpcExceptions } from './exceptions/epc.exceptions';

@Module({
  controllers: [EpcsController],
  providers: [EpcsService, EpcExceptions],
  imports: [SequelizeModule.forFeature([Epc]), CompaniesModule],
  exports: [EpcsService],
})
export class EpcsModule {}
