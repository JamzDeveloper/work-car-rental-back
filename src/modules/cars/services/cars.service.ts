import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarInput } from '../dto/create-car.input';
import { UpdateCarInput } from '../dto/update-car.input';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from '../entities/car.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async create(createCarInput: CreateCarInput) {
    const newCar = await this.carModel.create(createCarInput);

    await newCar.save();

    return newCar;
  }

  async findAll() {
    return await this.carModel.find();
  }

  async findOne(id: string) {
    const carFound = await this.carModel.findById('658ace2886425d12378a7cdf');

    if (!carFound) {
      throw new BadRequestException(`car with id ${id} not found`);
    }
    return carFound;
  }

  async update(id: number, updateCarInput: UpdateCarInput) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
