import { Module } from '@nestjs/common';
import { ExtrasService } from './services/extras.service';
import { ExtrasResolver } from './resolvers/extras.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Extra, ExtraSchema } from './entities/extra.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Extra.name, schema: ExtraSchema }]),
  ],
  providers: [ExtrasResolver, ExtrasService],
})
export class ExtrasModule {}
