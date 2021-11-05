import { Test, TestingModule } from '@nestjs/testing';
import { DealersController } from './dealers.controller';
import { DealersService } from './dealers.service';

describe('DealersController', () => {
  let controller: DealersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealersController],
      providers: [DealersService],
    }).compile();

    controller = module.get<DealersController>(DealersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
