import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarsService } from '../services/cars.service';
import { CreateCarInput } from '../dto/create-car.input';
import { UpdateCarInput } from '../dto/update-car.input';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
@Resolver('Car')
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Mutation('createCar')
  async create(
    @Args('createCarInput') createCarInput: CreateCarInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    fileUpload: GraphQLUpload,
  ) {
    if (!fileUpload) {
      return this.carsService.create(createCarInput, null);
    }
    const { file } = await fileUpload;

    return this.carsService.create(createCarInput, file);
  }

  @Query('cars')
  findAll() {
    return this.carsService.findAll();
  }

  @Query('car')
  findOne(@Args('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Mutation('updateCar')
  async update(
    @Args('id') id: string,
    @Args('updateCarInput') updateCarInput: UpdateCarInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    fileUpload: GraphQLUpload,
  ) {
    if (!fileUpload) {
      return this.carsService.update(id, updateCarInput, null);
    }
    const { file } = await fileUpload;

    return this.carsService.update(id, updateCarInput, file);
  }

  @Mutation('removeCar')
  remove(@Args('id') id: string) {
    return this.carsService.remove(id);
  }

  // @Mutation('test')
  // async test(
  //   @Args({ name: 'file', type: () => GraphQLUpload })
  //   fileUpload: GraphQLUpload,
  // ) {
  //   console.log('car.resolve 53', fileUpload);

  //   return true;
  // }
}
