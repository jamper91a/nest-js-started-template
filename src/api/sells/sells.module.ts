import { Module } from '@nestjs/common';
import { SellsService } from './sells.service';
import { SellsController } from './sells.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sell } from './entities/sell.entity';

@Module({
  controllers: [SellsController],
  providers: [SellsService],
  imports: [SequelizeModule.forFeature([Sell])],
})
export class SellsModule {}
