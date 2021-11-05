import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesInventoriesService } from './employees-inventories.service';

describe('EmployeesInventoriesService', () => {
  let service: EmployeesInventoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesInventoriesService],
    }).compile();

    service = module.get<EmployeesInventoriesService>(
      EmployeesInventoriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
