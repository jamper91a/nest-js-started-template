import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesProductsService } from './inventories-products.service';

describe('InventoriesProductsService', () => {
  let service: InventoriesProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoriesProductsService],
    }).compile();

    service = module.get<InventoriesProductsService>(InventoriesProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
