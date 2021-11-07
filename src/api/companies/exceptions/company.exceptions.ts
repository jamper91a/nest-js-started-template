import { BadRequestException } from '@nestjs/common';

export class CompanyExceptions {
  companyNotFound() {
    throw new BadRequestException(null, 'Company not found');
  }
}
