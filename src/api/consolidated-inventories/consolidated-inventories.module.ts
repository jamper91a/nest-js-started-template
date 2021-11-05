import { Module } from '@nestjs/common';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';
import { ConsolidatedInventoriesController } from './consolidated-inventories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConsolidatedInventory } from './entities/consolidated-inventory.entity';

@Module({
  controllers: [ConsolidatedInventoriesController],
  providers: [ConsolidatedInventoriesService],
  imports: [SequelizeModule.forFeature([ConsolidatedInventory])],
})
export class ConsolidatedInventoriesModule {}
