import { Injectable } from '@nestjs/common';
import { CreateInventoriesProductDto } from './dto/create-inventories-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { InventoryProduct } from './entities/inventories-product.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class InventoriesProductsService {
  constructor(
    @InjectModel(InventoryProduct)
    private inventoriesProductModel: typeof InventoryProduct,
  ) {}

  async createSeveral(
    createInventoriesProductDto: CreateInventoriesProductDto[],
    transaction: Transaction,
  ) {
    return await this.inventoriesProductModel.bulkCreate(
      createInventoriesProductDto,
      {
        transaction,
      },
    );
  }
}
