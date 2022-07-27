import { Test, TestingModule } from '@nestjs/testing';
import { BoletosService } from './boletos.service';

describe('BoletosService', () => {
  let service: BoletosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoletosService],
    }).compile();

    service = module.get<BoletosService>(BoletosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});