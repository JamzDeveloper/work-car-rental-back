import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FaqService } from '../services/faq.service';
import { CreateFaqInput } from '../dto/create-faq.input';
import { UpdateFaqInput } from '../dto/update-faq.input';

@Resolver('Faq')
export class FaqResolver {
  constructor(private readonly faqService: FaqService) {}

  @Mutation('createFaq')
  create(@Args('data') createFaqInput: CreateFaqInput) {
    return this.faqService.create(createFaqInput);
  }

  @Query('faqs')
  findAll() {
    return this.faqService.findAll();
  }

  @Query('faq')
  findOne(@Args('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Mutation('updateFaq')
  update(
    @Args('id') id: string,
    @Args('data') updateFaqInput: UpdateFaqInput,
  ) {
    return this.faqService.update(id, updateFaqInput);
  }

  @Mutation('removeFaq')
  remove(@Args('id') id: string) {
    return this.faqService.remove(id);
  }
}
