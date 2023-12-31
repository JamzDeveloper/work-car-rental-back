import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarInput } from '../dto/create-car.input';
import { UpdateCarInput } from '../dto/update-car.input';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from '../entities/car.entity';
import { Model, Types } from 'mongoose';
import { FileUpload } from 'src/modules/scalars/types/file.type';
import { S3Service } from '../../../services/s3/services/s3.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createCarInput: CreateCarInput,
    file: Promise<FileUpload> | Promise<null>,
  ) {
    const newPhoto: FileUpload | null = await file;

    if (newPhoto && newPhoto != undefined) {
      const { url: image, key } = await this.s3Service.uploadFile(
        'cars/',
        newPhoto,
      );
      createCarInput.image = image ?? null;
      createCarInput.imageAws = key ?? null;
    }
    const newCar = await this.carModel.create(createCarInput);

    await newCar.save();

    return newCar;
  }

  async findAll() {
    return await this.carModel.find();
  }

  async findOne(id: string) {
    const carFound = await this.carModel.findById(id);

    if (!carFound) {
      throw new BadRequestException(`car with id ${id} not found`);
    }
    return carFound;
  }

  async update(
    id: string,
    updateCarInput: UpdateCarInput,
    file: Promise<FileUpload> | Promise<null>,
  ) {
    const carFound = await this.findOne(id);

    const newPhoto: FileUpload | null = await file;
    if (newPhoto && newPhoto != undefined) {
      if (carFound.imageAws) {
        await this.s3Service.deleteFile(carFound.imageAws);
      }
      const { url: image, key } = await this.s3Service.uploadFile(
        'cars/',
        newPhoto,
      );
      updateCarInput.image = image ?? null;
      updateCarInput.imageAws = key ?? null;
    }
    await carFound.updateOne({ ...updateCarInput });

    return {
      ...carFound.toJSON(),
      ...updateCarInput,
    };
  }

  async remove(id: string) {
    const cardFound = await this.carModel.findById(id);
    await this.s3Service.deleteFile(cardFound.imageAws);

    const result = await cardFound.deleteOne();

    return result ? true : false;
  }
}
