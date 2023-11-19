import { Module } from '@nestjs/common';
import { FaqService } from './services/faq.service';
import { FaqResolver } from './resolvers/faq.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Faq, FaqSchema } from './entities/faq.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }])],
  providers: [FaqResolver, FaqService],
})
export class FaqModule {}
