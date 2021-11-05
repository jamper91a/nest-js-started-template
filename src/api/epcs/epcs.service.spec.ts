import { Test, TestingModule } from '@nestjs/testing';
import { EpcsService } from './epcs.service';

describe('EpcsService', () => {
  let service: EpcsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpcsService],
    }).compile();

    service = module.get<EpcsService>(EpcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
