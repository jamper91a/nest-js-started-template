import { Module } from '@nestjs/common';
import { SellsHistoryService } from './sells-history.service';
import { SellsHistoryController } from './sells-history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SellHistory } from './entities/sells-history.entity';

@Module({
  controllers: [SellsHistoryController],
  providers: [SellsHistoryService],
  imports: [SequelizeModule.forFeature([SellHistory])],
})
export class SellsHistoryModule {}
