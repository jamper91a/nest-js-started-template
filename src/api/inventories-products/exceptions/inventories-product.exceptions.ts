import { BadRequestException } from '@nestjs/common';

export class InventoriesProductExceptions {
  productsNoAssociated() {
    return new BadRequestException(
      null,
      'Products could not be associated with the inventory',
    );
  }
}
