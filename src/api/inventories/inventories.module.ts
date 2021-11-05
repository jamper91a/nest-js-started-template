import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inventory } from './entities/inventory.entity';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService],
  imports: [SequelizeModule.forFeature([Inventory])],
})
export class InventoriesModule {}
