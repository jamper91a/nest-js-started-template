import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inventory } from './entities/inventory.entity';
import { EmployeesInventoriesModule } from '../employees-inventories/employees-inventories.module';
import { InventoriesProductsModule } from '../inventories-products/inventories-products.module';
import { InventoryExceptions } from './exceptions/inventory.exceptions';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService, InventoryExceptions],
  imports: [
    SequelizeModule.forFeature([Inventory]),
    EmployeesInventoriesModule,
    InventoriesProductsModule,
  ],
  exports: [InventoriesService, InventoryExceptions],
})
export class InventoriesModule {}
