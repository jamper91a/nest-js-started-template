import { BadRequestException } from '@nestjs/common';

export class EpcExceptions {
  companyNoValid() {
    throw new BadRequestException(null, 'Company no valid');
  }
}
