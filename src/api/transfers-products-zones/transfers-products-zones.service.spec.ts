import { Test, TestingModule } from '@nestjs/testing';
import { TransfersProductsZonesService } from './transfers-products-zones.service';

describe('TransfersProductsZonesService', () => {
  let service: TransfersProductsZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransfersProductsZonesService],
    }).compile();

    service = module.get<TransfersProductsZonesService>(TransfersProductsZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
