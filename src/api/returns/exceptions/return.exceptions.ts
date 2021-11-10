import { BadRequestException } from '@nestjs/common';

export class ReturnExceptions {
  productsNoReturned() {
    throw new BadRequestException(null, 'Products were not returned');
  }

  historyNoCreated() {
    throw new BadRequestException(null, 'Return history was not creatd');
  }
}
