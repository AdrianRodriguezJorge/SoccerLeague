import { Test, TestingModule } from '@nestjs/testing';
import { FutbolistaController } from './futbolista.controller';

describe('FutbolistaController', () => {
  let controller: FutbolistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FutbolistaController],
    }).compile();

    controller = module.get<FutbolistaController>(FutbolistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
