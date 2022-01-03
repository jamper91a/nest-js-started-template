import { BadRequestException } from '@nestjs/common';

export class ReportsExceptions {
  productsNoFound() {
    throw new BadRequestException(
      null,
      'Products not found on consolidate inventories',
    );
  }
}
