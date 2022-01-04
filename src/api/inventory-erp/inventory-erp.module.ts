import { Module } from '@nestjs/common';
import { InventoryErpService } from './inventory-erp.service';
import { InventoryErpController } from './inventory-erp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryErp } from './entities/inventory-erp.entity';

@Module({
  controllers: [InventoryErpController],
  providers: [InventoryErpService],
  imports: [SequelizeModule.forFeature([InventoryErp])],
  exports: [InventoryErpService],
})
export class InventoryErpModule {}
