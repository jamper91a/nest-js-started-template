import { Test, TestingModule } from '@nestjs/testing';
import { ReturnsHistoryController } from './returns-history.controller';
import { ReturnsHistoryService } from './returns-history.service';

describe('ReturnsHistoryController', () => {
  let controller: ReturnsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturnsHistoryController],
      providers: [ReturnsHistoryService],
    }).compile();

    controller = module.get<ReturnsHistoryController>(ReturnsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
