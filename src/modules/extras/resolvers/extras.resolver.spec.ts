import { Test, TestingModule } from '@nestjs/testing';
import { ExtrasResolver } from './extras.resolver';
import { ExtrasService } from '../services/extras.service';

describe('ExtrasResolver', () => {
  let resolver: ExtrasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtrasResolver, ExtrasService],
    }).compile();

    resolver = module.get<ExtrasResolver>(ExtrasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
