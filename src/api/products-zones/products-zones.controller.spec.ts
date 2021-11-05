import { Test, TestingModule } from '@nestjs/testing';
import { ProductsZonesController } from './products-zones.controller';
import { ProductsZonesService } from './products-zones.service';

describe('ProductsZonesController', () => {
  let controller: ProductsZonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsZonesController],
      providers: [ProductsZonesService],
    }).compile();

    controller = module.get<ProductsZonesController>(ProductsZonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
