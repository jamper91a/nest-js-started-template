import { Test, TestingModule } from '@nestjs/testing';
import { InventoryErpController } from './inventory-erp.controller';
import { InventoryErpService } from './inventory-erp.service';

describe('InventoryErpController', () => {
  let controller: InventoryErpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryErpController],
      providers: [InventoryErpService],
    }).compile();

    controller = module.get<InventoryErpController>(InventoryErpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
