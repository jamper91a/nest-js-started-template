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
import { InventoryErpModule } from '../inventory-erp/inventory-erp.module';
import { ReportsExceptions } from './exceptions/reports.exceptions';
import { UtilService } from '../../util/util.service';
import { EmployeesModule } from '../employees/employees.module';
import { ReportsProductsZonesModule } from '../reports-products-zones/reports-products-zones.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsExceptions, UtilService],
  imports: [
    SequelizeModule.forFeature([Report]),
    ZonesModule,
    ReturnsModule,
    ProductsZonesModule,
    InventoriesModule,
    TransfersProductsZonesModule,
    InventoryErpModule,
    EmployeesModule,
    ReportsProductsZonesModule,
  ],
})
export class ReportsModule {}
