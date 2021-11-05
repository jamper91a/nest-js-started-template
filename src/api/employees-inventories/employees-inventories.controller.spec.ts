import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesInventoriesController } from './employees-inventories.controller';
import { EmployeesInventoriesService } from './employees-inventories.service';

describe('EmployeesInventoriesController', () => {
  let controller: EmployeesInventoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesInventoriesController],
      providers: [EmployeesInventoriesService],
    }).compile();

    controller = module.get<EmployeesInventoriesController>(
      EmployeesInventoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
