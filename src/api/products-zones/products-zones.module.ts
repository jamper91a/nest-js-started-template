import { Module } from '@nestjs/common';
import { ProductsZonesService } from './products-zones.service';
import { ProductsZonesController } from './products-zones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsZone } from './entities/products-zone.entity';

@Module({
  controllers: [ProductsZonesController],
  providers: [ProductsZonesService],
  imports: [SequelizeModule.forFeature([ProductsZone])],
})
export class ProductsZonesModule {}
