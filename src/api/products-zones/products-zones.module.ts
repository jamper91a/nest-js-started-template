import { Module } from '@nestjs/common';
import { ProductsZonesService } from './products-zones.service';
import { ProductsZonesController } from './products-zones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsZone } from './entities/products-zone.entity';
import { ReturnsHistoryModule } from '../returns-history/returns-history.module';
import { ProductsZonesExceptions } from './exceptions/products-zones.exceptions';

@Module({
  controllers: [ProductsZonesController],
  providers: [ProductsZonesService, ProductsZonesExceptions],
  imports: [SequelizeModule.forFeature([ProductsZone]), ReturnsHistoryModule],
  exports: [ProductsZonesService],
})
export class ProductsZonesModule {}
