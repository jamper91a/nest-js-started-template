import { Module } from '@nestjs/common';
import { ReportsProductsZonesService } from './reports-products-zones.service';
import { ReportsProductsZonesController } from './reports-products-zones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReportsProductsZone } from './entities/reports-products-zone.entity';

@Module({
  controllers: [ReportsProductsZonesController],
  providers: [ReportsProductsZonesService],
  imports: [SequelizeModule.forFeature([ReportsProductsZone])],
  exports: [ReportsProductsZonesService],
})
export class ReportsProductsZonesModule {}
