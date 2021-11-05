import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesProductsController } from './inventories-products.controller';
import { InventoriesProductsService } from './inventories-products.service';

describe('InventoriesProductsController', () => {
  let controller: InventoriesProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoriesProductsController],
      providers: [InventoriesProductsService],
    }).compile();

    controller = module.get<InventoriesProductsController>(InventoriesProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
