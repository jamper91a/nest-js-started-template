import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transfer } from './entities/transfer.entity';

@Module({
  controllers: [TransfersController],
  providers: [TransfersService],
  imports: [SequelizeModule.forFeature([Transfer])],
})
export class TransfersModule {}
