import { Module } from '@nestjs/common';
import { InventoriesProductsService } from './inventories-products.service';
import { InventoriesProductsController } from './inventories-products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoriesProduct } from './entities/inventories-product.entity';

@Module({
  controllers: [InventoriesProductsController],
  providers: [InventoriesProductsService],
  imports: [SequelizeModule.forFeature([InventoriesProduct])],
})
export class InventoriesProductsModule {}
