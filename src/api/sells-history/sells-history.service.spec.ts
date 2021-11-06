import { Test, TestingModule } from '@nestjs/testing';
import { SellsHistoryService } from './sells-history.service';

describe('SellsHistoryService', () => {
  let service: SellsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellsHistoryService],
    }).compile();

    service = module.get<SellsHistoryService>(SellsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
