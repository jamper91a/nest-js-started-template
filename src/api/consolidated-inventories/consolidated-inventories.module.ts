import { Module } from '@nestjs/common';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';
import { ConsolidatedInventoriesController } from './consolidated-inventories.controller';

@Module({
  controllers: [ConsolidatedInventoriesController],
  providers: [ConsolidatedInventoriesService]
})
export class ConsolidatedInventoriesModule {}
