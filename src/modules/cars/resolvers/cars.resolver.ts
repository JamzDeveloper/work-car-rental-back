import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarsService } from '../services/cars.service';
import { CreateCarInput } from '../dto/create-car.input';
import { UpdateCarInput } from '../dto/update-car.input';

@Resolver('Car')
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Mutation('createCar')
  create(@Args('createCarInput') createCarInput: CreateCarInput) {
    return this.carsService.create(createCarInput);
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
