import { Test, TestingModule } from '@nestjs/testing';
import { ConsolidatedInventoriesController } from './consolidated-inventories.controller';
import { ConsolidatedInventoriesService } from './consolidated-inventories.service';

describe('ConsolidatedInventoriesController', () => {
  let controller: ConsolidatedInventoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsolidatedInventoriesController],
      providers: [ConsolidatedInventoriesService],
    }).compile();

    controller = module.get<ConsolidatedInventoriesController>(ConsolidatedInventoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
