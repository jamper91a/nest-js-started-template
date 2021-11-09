import { BadRequestException } from '@nestjs/common';

export class ConsolidatedInventoriesExceptions {
  consolidatedInventoriesNoFound() {
    throw new BadRequestException(null, 'Company not found');
  }

  employeeNotValid() {
    throw new BadRequestException(null, 'Employee no valid');
  }
}
