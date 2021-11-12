import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from './entities/inventory.entity';
import { literal, Transaction } from 'sequelize';
import { FindAttributeOptions, Includeable } from 'sequelize/types/lib/model';

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

  async findAllById(
    id: number[],
    attributes?: FindAttributeOptions,
    include?: Includeable[],
  ) {
    return this.inventoryModel.findAll({ where: { id }, attributes, include });
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

  async updateConsolidatedInventory(
    ids: number[],
    consolidatedInventoryId: number,
    transaction: Transaction,
  ) {
    return await this.inventoryModel.update(
      { consolidatedInventoryId },
      { where: { id: ids }, transaction },
    );
  }
}
