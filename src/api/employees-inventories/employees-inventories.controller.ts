import { Controller } from '@nestjs/common';
import { EmployeesInventoriesService } from './employees-inventories.service';

@Controller('employees-inventories')
export class EmployeesInventoriesController {
  constructor(
    private readonly employeesInventoriesService: EmployeesInventoriesService,
  ) {}
}
