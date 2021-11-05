import { Test, TestingModule } from '@nestjs/testing';
import { InventoryErpService } from './inventory-erp.service';

describe('InventoryErpService', () => {
  let service: InventoryErpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryErpService],
    }).compile();

    service = module.get<InventoryErpService>(InventoryErpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
