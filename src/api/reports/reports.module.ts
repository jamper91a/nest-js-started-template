import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [SequelizeModule.forFeature([Report])],
})
export class ReportsModule {}
