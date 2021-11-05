import { Injectable } from '@nestjs/common';
import { CreateConsolidatedInventoryDto } from './dto/create-consolidated-inventory.dto';
import { UpdateConsolidatedInventoryDto } from './dto/update-consolidated-inventory.dto';

@Injectable()
export class ConsolidatedInventoriesService {
  create(createConsolidatedInventoryDto: CreateConsolidatedInventoryDto) {
    return 'This action adds a new consolidatedInventory';
  }

  findAll() {
    return `This action returns all consolidatedInventories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consolidatedInventory`;
  }

  update(id: number, updateConsolidatedInventoryDto: UpdateConsolidatedInventoryDto) {
    return `This action updates a #${id} consolidatedInventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} consolidatedInventory`;
  }
}
