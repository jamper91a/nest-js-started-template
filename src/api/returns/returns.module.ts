import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Return } from './entities/return.entity';

@Module({
  controllers: [ReturnsController],
  providers: [ReturnsService],
  imports: [SequelizeModule.forFeature([Return])],
})
export class ReturnsModule {}
