import { Injectable } from '@nestjs/common';
import { CreateEmployeesInventoryDto } from './dto/create-employees-inventory.dto';
import { UpdateEmployeesInventoryDto } from './dto/update-employees-inventory.dto';

@Injectable()
export class EmployeesInventoriesService {
  create(createEmployeesInventoryDto: CreateEmployeesInventoryDto) {
    return 'This action adds a new employeesInventory';
  }

  findAll() {
    return `This action returns all employeesInventories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeesInventory`;
  }

  update(id: number, updateEmployeesInventoryDto: UpdateEmployeesInventoryDto) {
    return `This action updates a #${id} employeesInventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeesInventory`;
  }
}
