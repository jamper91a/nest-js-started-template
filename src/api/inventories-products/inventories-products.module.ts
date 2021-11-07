import { Module } from '@nestjs/common';
import { InventoriesProductsService } from './inventories-products.service';
import { InventoriesProductsController } from './inventories-products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryProduct } from './entities/inventories-product.entity';

@Module({
  controllers: [InventoriesProductsController],
  providers: [InventoriesProductsService],
  imports: [SequelizeModule.forFeature([InventoryProduct])],
})
export class InventoriesProductsModule {}
