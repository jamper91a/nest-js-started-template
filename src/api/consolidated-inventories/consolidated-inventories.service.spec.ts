import { Test, TestingModule } from '@nestjs/testing';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';

describe('ConsolidatedInventoriesService', () => {
  let service: ConsolidatedInventoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsolidatedInventoriesService],
    }).compile();

    service = module.get<ConsolidatedInventoriesService>(ConsolidatedInventoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
