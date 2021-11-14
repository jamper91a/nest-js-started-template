import { Injectable } from '@nestjs/common';
import { ProductInventoryErpDto } from './dto/create-inventory-erp.dto';
import { InjectModel } from '@nestjs/sequelize';
import { InventoryErp } from './entities/inventory-erp.entity';

@Injectable()
export class InventoryErpService {
  constructor(
    @InjectModel(InventoryErp)
    private inventoryErpModel: typeof InventoryErp,
  ) {}

  async create(shopId: number, products: ProductInventoryErpDto[]) {
    return await this.inventoryErpModel.create({ shopId, products });
  }
}
