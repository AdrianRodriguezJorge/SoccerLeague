import { Test, TestingModule } from '@nestjs/testing';
import { EstadioService } from './estadio.service';

describe('EstadioService', () => {
  let service: EstadioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadioService],
    }).compile();

    service = module.get<EstadioService>(EstadioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
