import { Test, TestingModule } from '@nestjs/testing';
import { SellsHistoryController } from './sells-history.controller';
import { SellsHistoryService } from './sells-history.service';

describe('SellsHistoryController', () => {
  let controller: SellsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellsHistoryController],
      providers: [SellsHistoryService],
    }).compile();

    controller = module.get<SellsHistoryController>(SellsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
