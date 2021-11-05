import { Test, TestingModule } from '@nestjs/testing';
import { EpcsController } from './epcs.controller';
import { EpcsService } from './epcs.service';

describe('EpcsController', () => {
  let controller: EpcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpcsController],
      providers: [EpcsService],
    }).compile();

    controller = module.get<EpcsController>(EpcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
