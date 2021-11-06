import { Test, TestingModule } from '@nestjs/testing';
import { TransfersProductsZonesController } from './transfers-products-zones.controller';
import { TransfersProductsZonesService } from './transfers-products-zones.service';

describe('TransfersProductsZonesController', () => {
  let controller: TransfersProductsZonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransfersProductsZonesController],
      providers: [TransfersProductsZonesService],
    }).compile();

    controller = module.get<TransfersProductsZonesController>(TransfersProductsZonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
