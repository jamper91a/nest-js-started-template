import { Test, TestingModule } from '@nestjs/testing';
import { ReportsProductsZonesService } from './reports-products-zones.service';

describe('ReportsProductsZonesService', () => {
  let service: ReportsProductsZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsProductsZonesService],
    }).compile();

    service = module.get<ReportsProductsZonesService>(ReportsProductsZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
