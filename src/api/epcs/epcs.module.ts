import { Module } from '@nestjs/common';
import { EpcsService } from './epcs.service';
import { EpcsController } from './epcs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Epc } from './entities/epc.entity';

@Module({
  controllers: [EpcsController],
  providers: [EpcsService],
  imports: [SequelizeModule.forFeature([Epc])],
})
export class EpcsModule {}
