import { forwardRef, Module } from '@nestjs/common';
import { ProductsZonesService } from './products-zones.service';
import { ProductsZonesController } from './products-zones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsZone } from './entities/products-zone.entity';
import { ReturnsHistoryModule } from '../returns-history/returns-history.module';
import { ProductsZonesExceptions } from './exceptions/products-zones.exceptions';
import { ProductsModule } from '../products/products.module';
import { EpcsModule } from '../epcs/epcs.module';
import { ZonesModule } from '../zones/zones.module';

@Module({
  controllers: [ProductsZonesController],
  providers: [ProductsZonesService, ProductsZonesExceptions],
  imports: [
    SequelizeModule.forFeature([ProductsZone]),
    ReturnsHistoryModule,
    forwardRef(() => ProductsModule),
    EpcsModule,
    ZonesModule,
  ],
  exports: [ProductsZonesService],
})
export class ProductsZonesModule {}
