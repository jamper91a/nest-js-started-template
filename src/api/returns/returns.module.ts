import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Return } from './entities/return.entity';
import { ReturnsHistoryModule } from '../returns-history/returns-history.module';
import { ReturnExceptions } from './exceptions/return.exceptions';

@Module({
  controllers: [ReturnsController],
  providers: [ReturnsService, ReturnExceptions],
  imports: [SequelizeModule.forFeature([Return]), ReturnsHistoryModule],
  exports: [ReturnsService],
})
export class ReturnsModule {}
