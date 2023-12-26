import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { CarsResolver } from './resolvers/cars.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './entities/car.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Car.name,
        schema: CarSchema,
      },
    ]),
  ],
  providers: [CarsResolver, CarsService],
})
export class CarsModule {}
