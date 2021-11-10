import { Module } from '@nestjs/common';
import { ReturnsHistoryService } from './returns-history.service';
import { ReturnsHistoryController } from './returns-history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReturnHistory } from './entities/returns-history.entity';

@Module({
  controllers: [ReturnsHistoryController],
  providers: [ReturnsHistoryService],
  imports: [SequelizeModule.forFeature([ReturnHistory])],
  exports: [ReturnsHistoryService],
})
export class ReturnsHistoryModule {}
