import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';
import { ZonesModule } from '../zones/zones.module';
import { ReturnsModule } from '../returns/returns.module';
import { ProductsZonesModule } from '../products-zones/products-zones.module';
import { InventoriesModule } from '../inventories/inventories.module';
import { TransfersProductsZonesModule } from '../transfers-products-zones/transfers-products-zones.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    SequelizeModule.forFeature([Report]),
    ZonesModule,
    ReturnsModule,
    ProductsZonesModule,
    InventoriesModule,
    TransfersProductsZonesModule,
  ],
})
export class ReportsModule {}
