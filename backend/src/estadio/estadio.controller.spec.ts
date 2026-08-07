import { Test, TestingModule } from '@nestjs/testing';
import { EstadioController } from './estadio.controller';

describe('EstadioController', () => {
  let controller: EstadioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadioController],
    }).compile();

    controller = module.get<EstadioController>(EstadioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
