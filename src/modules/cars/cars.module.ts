import { Module } from '@nestjs/common';
import { CarsService } from './services/cars.service';
import { CarsResolver } from './resolvers/cars.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './entities/car.entity';
import { S3Module } from 'src/services/s3/s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Car.name,
        schema: CarSchema,
      },
    ]),
    S3Module
  ],
  providers: [CarsResolver, CarsService],
})
export class CarsModule {}
