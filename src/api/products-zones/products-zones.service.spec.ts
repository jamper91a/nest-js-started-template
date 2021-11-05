import { Test, TestingModule } from '@nestjs/testing';
import { ProductsZonesService } from './products-zones.service';

describe('ProductsZonesService', () => {
  let service: ProductsZonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsZonesService],
    }).compile();

    service = module.get<ProductsZonesService>(ProductsZonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
