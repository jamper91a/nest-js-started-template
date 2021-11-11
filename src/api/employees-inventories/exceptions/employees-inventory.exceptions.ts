import { BadRequestException } from '@nestjs/common';

export class EmployeesInventoryExceptions {
  employeesNoAssociated() {
    new BadRequestException(
      null,
      'Employees could not be associated with the inventory',
    );
  }
}
