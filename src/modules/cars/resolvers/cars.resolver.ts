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
    console.log("car.resolve 16",fileUpload)
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
  update(@Args('updateCarInput') updateCarInput: UpdateCarInput) {
    return this.carsService.update(updateCarInput.id, updateCarInput);
  }

  @Mutation('removeCar')
  remove(@Args('id') id: number) {
    return this.carsService.remove(id);
  }
}
