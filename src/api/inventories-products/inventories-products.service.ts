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

  createSeveral(
    createInventoriesProductDto: CreateInventoriesProductDto[],
    transaction: Transaction,
  ) {
    return this.inventoriesProductModel.create(createInventoriesProductDto, {
      transaction,
    });
  }
}
