import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExtrasService } from '../services/extras.service';
import { CreateExtraInput } from '../dto/create-extra.input';
import { UpdateExtraInput } from '../dto/update-extra.input';
import { FilterExtraInput } from '../dto/filter-extra.input';

@Resolver('Extra')
export class ExtrasResolver {
  constructor(private readonly extrasService: ExtrasService) {}

  @Mutation('createExtra')
  create(@Args('data') createExtraInput: CreateExtraInput) {
    return this.extrasService.create(createExtraInput);
  }

  @Query('extras')
  findAll(@Args('filter') filterExtraInput: FilterExtraInput) {
    return this.extrasService.findAll(filterExtraInput);
  }

  @Query('extra')
  findOne(@Args('id') id: string) {
    return this.extrasService.findOne(id);
  }

  @Mutation('updateExtra')
  update(
    @Args('id') id: string,
    @Args('data') updateExtraInput: UpdateExtraInput,
  ) {
    return this.extrasService.update(id, updateExtraInput);
  }

  @Mutation('removeExtra')
  remove(@Args('id') id: string) {
    return this.extrasService.remove(id);
  }
}
