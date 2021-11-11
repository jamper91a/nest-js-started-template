import { Controller } from '@nestjs/common';
import { InventoriesProductsService } from './inventories-products.service';

@Controller('inventories-products')
export class InventoriesProductsController {
  constructor(
    private readonly inventoriesProductsService: InventoriesProductsService,
  ) {}
}
