import { Injectable } from '@nestjs/common';
import { CreateInventoryErpDto } from './dto/create-inventory-erp.dto';
import { UpdateInventoryErpDto } from './dto/update-inventory-erp.dto';

@Injectable()
export class InventoryErpService {
  create(createInventoryErpDto: CreateInventoryErpDto) {
    return 'This action adds a new inventoryErp';
  }

  findAll() {
    return `This action returns all inventoryErp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryErp`;
  }

  update(id: number, updateInventoryErpDto: UpdateInventoryErpDto) {
    return `This action updates a #${id} inventoryErp`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryErp`;
  }
}
