import { BadRequestException } from '@nestjs/common';

export class InventoryExceptions {
  inventoryIsNotCollaborative() {
    return new BadRequestException(null, 'Inventory is not collaborative');
  }
}
