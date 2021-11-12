import { BadRequestException } from '@nestjs/common';

export class InventoryExceptions {
  inventoriesNoValid() {
    return new BadRequestException(null, 'Inventories not valid');
  }

  inventoryIsNotCollaborative() {
    return new BadRequestException(null, 'Inventory is not collaborative');
  }

  notSameZone() {
    return new BadRequestException(
      null,
      'Inventories do not have the same zone',
    );
  }

  inventoryAlreadyConsolidated(inventory) {
    return new BadRequestException(
      null,
      `Inventory ${inventory.id} already consolidated`,
    );
  }
}
