import { Injectable } from '@nestjs/common';
import { CreateInventoriesProductDto } from './dto/create-inventories-product.dto';
import { UpdateInventoriesProductDto } from './dto/update-inventories-product.dto';

@Injectable()
export class InventoriesProductsService {
  create(createInventoriesProductDto: CreateInventoriesProductDto) {
    return 'This action adds a new inventoriesProduct';
  }

  findAll() {
    return `This action returns all inventoriesProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoriesProduct`;
  }

  update(id: number, updateInventoriesProductDto: UpdateInventoriesProductDto) {
    return `This action updates a #${id} inventoriesProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoriesProduct`;
  }
}
