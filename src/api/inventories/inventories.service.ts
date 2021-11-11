import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from './entities/inventory.entity';
import { literal, Transaction } from 'sequelize';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectModel(Inventory)
    private inventoryModel: typeof Inventory,
  ) {}

  create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  findAll() {
    return `This action returns all inventories`;
  }

  async findOne(id: number) {
    return this.inventoryModel.findOne({ where: { id } });
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }

  updateInventoryMessage(
    id: number,
    newMessage: string,
    transaction: Transaction,
  ) {
    return this.inventoryModel.update(
      {
        message: literal('messages' + '.' + newMessage),
      },
      {
        where: { id },
        transaction,
      },
    );
  }
}
