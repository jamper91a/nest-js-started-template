import { Module } from '@nestjs/common';
import { InventoriesProductsService } from './inventories-products.service';
import { InventoriesProductsController } from './inventories-products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryProduct } from './entities/inventories-product.entity';
import { InventoriesProductExceptions } from './exceptions/inventories-product.exceptions';

@Module({
  controllers: [InventoriesProductsController],
  providers: [InventoriesProductsService, InventoriesProductExceptions],
  imports: [SequelizeModule.forFeature([InventoryProduct])],
  exports: [InventoriesProductsService, InventoriesProductExceptions],
})
export class InventoriesProductsModule {}
