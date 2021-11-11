import { Module } from '@nestjs/common';
import { EmployeesInventoriesService } from './employees-inventories.service';
import { EmployeesInventoriesController } from './employees-inventories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeInventory } from './entities/employees-inventory.entity';
import { EmployeesInventoryExceptions } from './exceptions/employees-inventory.exceptions';

@Module({
  controllers: [EmployeesInventoriesController],
  providers: [EmployeesInventoriesService, EmployeesInventoryExceptions],
  imports: [SequelizeModule.forFeature([EmployeeInventory])],
  exports: [EmployeesInventoriesService, EmployeesInventoryExceptions],
})
export class EmployeesInventoriesModule {}
