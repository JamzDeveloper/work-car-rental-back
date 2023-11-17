import { Module } from '@nestjs/common';
import { ExtrasService } from './services/extras.service';
import { ExtrasResolver } from './resolvers/extras.resolver';

@Module({
  providers: [ExtrasResolver, ExtrasService],
})
export class ExtrasModule {}
