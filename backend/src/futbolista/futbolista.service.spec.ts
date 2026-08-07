import { Test, TestingModule } from '@nestjs/testing';
import { FutbolistaService } from './futbolista.service';

describe('FutbolistaService', () => {
  let service: FutbolistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FutbolistaService],
    }).compile();

    service = module.get<FutbolistaService>(FutbolistaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
