import { Test, TestingModule } from '@nestjs/testing';
import { HttpModuleService } from './http-module.service';

describe('HttpModuleService', () => {
  let service: HttpModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpModuleService],
    }).compile();

    service = module.get<HttpModuleService>(HttpModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
