import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesController } from './zones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Zone } from './entities/zone.entity';

@Module({
  controllers: [ZonesController],
  providers: [ZonesService],
  imports: [SequelizeModule.forFeature([Zone])],
  exports: [ZonesService],
})
export class ZonesModule {}
