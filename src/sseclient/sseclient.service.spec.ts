import { Test, TestingModule } from '@nestjs/testing';
import { SseclientService } from './sseclient.service';

describe('SseclientService', () => {
  let service: SseclientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SseclientService],
    }).compile();

    service = module.get<SseclientService>(SseclientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
