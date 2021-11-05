import { Module } from '@nestjs/common';
import { DealersService } from './dealers.service';
import { DealersController } from './dealers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dealer } from './entities/dealer.entity';

@Module({
  controllers: [DealersController],
  providers: [DealersService],
  imports: [SequelizeModule.forFeature([Dealer])],
})
export class DealersModule {}
