import { Module } from '@nestjs/common';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';
import { ConsolidatedInventoriesController } from './consolidated-inventories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConsolidatedInventory } from './entities/consolidated-inventory.entity';
import { ConsolidatedInventoriesExceptions } from './exceptions/consolidated-inventories.exceptions';

@Module({
  controllers: [ConsolidatedInventoriesController],
  providers: [
    ConsolidatedInventoriesService,
    ConsolidatedInventoriesExceptions,
  ],
  imports: [SequelizeModule.forFeature([ConsolidatedInventory])],
})
export class ConsolidatedInventoriesModule {}
