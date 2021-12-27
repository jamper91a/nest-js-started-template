import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Supplier } from './entities/supplier.entity';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
  imports: [SequelizeModule.forFeature([Supplier])],
  exports: [SuppliersService],
})
export class SuppliersModule {}
