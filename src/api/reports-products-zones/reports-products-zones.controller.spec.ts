import { Test, TestingModule } from '@nestjs/testing';
import { ReportsProductsZonesController } from './reports-products-zones.controller';
import { ReportsProductsZonesService } from './reports-products-zones.service';

describe('ReportsProductsZonesController', () => {
  let controller: ReportsProductsZonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsProductsZonesController],
      providers: [ReportsProductsZonesService],
    }).compile();

    controller = module.get<ReportsProductsZonesController>(ReportsProductsZonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
