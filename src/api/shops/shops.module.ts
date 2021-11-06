import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from './entities/shop.entity';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [SequelizeModule.forFeature([Shop])],
})
export class ShopsModule {}
