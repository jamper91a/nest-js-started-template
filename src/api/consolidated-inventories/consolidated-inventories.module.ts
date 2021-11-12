import { Module } from '@nestjs/common';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';
import { ConsolidatedInventoriesController } from './consolidated-inventories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConsolidatedInventory } from './entities/consolidated-inventory.entity';
import { ConsolidatedInventoriesExceptions } from './exceptions/consolidated-inventories.exceptions';
import { InventoriesModule } from '../inventories/inventories.module';
import { EmployeesInventoriesModule } from '../employees-inventories/employees-inventories.module';
import { InventoriesProductsModule } from '../inventories-products/inventories-products.module';

@Module({
  controllers: [ConsolidatedInventoriesController],
  providers: [
    ConsolidatedInventoriesService,
    ConsolidatedInventoriesExceptions,
  ],
  imports: [
    SequelizeModule.forFeature([ConsolidatedInventory]),
    InventoriesModule,
    EmployeesInventoriesModule,
    InventoriesProductsModule,
  ],
  exports: [ConsolidatedInventoriesService, ConsolidatedInventoriesExceptions],
})
export class ConsolidatedInventoriesModule {}
