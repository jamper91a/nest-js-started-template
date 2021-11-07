import { Module } from '@nestjs/common';
import { EmployeesInventoriesService } from './employees-inventories.service';
import { EmployeesInventoriesController } from './employees-inventories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeInventory } from './entities/employees-inventory.entity';

@Module({
  controllers: [EmployeesInventoriesController],
  providers: [EmployeesInventoriesService],
  imports: [SequelizeModule.forFeature([EmployeeInventory])],
})
export class EmployeesInventoriesModule {}
