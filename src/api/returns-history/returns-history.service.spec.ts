import { Test, TestingModule } from '@nestjs/testing';
import { ReturnsHistoryService } from './returns-history.service';

describe('ReturnsHistoryService', () => {
  let service: ReturnsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnsHistoryService],
    }).compile();

    service = module.get<ReturnsHistoryService>(ReturnsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
