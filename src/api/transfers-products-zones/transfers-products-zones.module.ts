import { Module } from '@nestjs/common';
import { TransfersProductsZonesService } from './transfers-products-zones.service';
import { TransfersProductsZonesController } from './transfers-products-zones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransfersProductsZone } from './entities/transfers-products-zone.entity';

@Module({
  controllers: [TransfersProductsZonesController],
  providers: [TransfersProductsZonesService],
  imports: [SequelizeModule.forFeature([TransfersProductsZone])],
  exports: [TransfersProductsZonesService],
})
export class TransfersProductsZonesModule {}
