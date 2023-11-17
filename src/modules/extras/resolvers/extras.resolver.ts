import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExtrasService } from '../services/extras.service';
import { CreateExtraInput } from '../dto/create-extra.input';
import { UpdateExtraInput } from '../dto/update-extra.input';

@Resolver('Extra')
export class ExtrasResolver {
  constructor(private readonly extrasService: ExtrasService) {}

  @Mutation('createExtra')
  create(@Args('createExtraInput') createExtraInput: CreateExtraInput) {
    return this.extrasService.create(createExtraInput);
  }

  @Query('extras')
  findAll() {
    return this.extrasService.findAll();
  }

  @Query('extra')
  findOne(@Args('id') id: number) {
    return this.extrasService.findOne(id);
  }

  @Mutation('updateExtra')
  update(@Args('updateExtraInput') updateExtraInput: UpdateExtraInput) {
    return this.extrasService.update(updateExtraInput.id, updateExtraInput);
  }

  @Mutation('removeExtra')
  remove(@Args('id') id: number) {
    return this.extrasService.remove(id);
  }
}
