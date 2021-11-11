import { Injectable } from '@nestjs/common';
import { CreateEmployeesInventoryDto } from './dto/create-employees-inventory.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeInventory } from './entities/employees-inventory.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class EmployeesInventoriesService {
  constructor(
    @InjectModel(EmployeeInventory)
    private employeeInventoryModel: typeof EmployeeInventory,
  ) {}

  async create(
    createEmployeesInventoryDto: CreateEmployeesInventoryDto,
    transaction: Transaction,
  ) {
    return await this.employeeInventoryModel.create(
      createEmployeesInventoryDto,
      { transaction },
    );
  }
}
