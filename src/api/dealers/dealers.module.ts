import { Module } from '@nestjs/common';
import { DealersService } from './dealers.service';
import { DealersController } from './dealers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dealer } from './entities/dealer.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [DealersController],
  providers: [DealersService],
  imports: [SequelizeModule.forFeature([Dealer]), UsersModule],
})
export class DealersModule {}
