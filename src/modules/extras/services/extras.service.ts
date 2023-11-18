import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExtraInput } from '../dto/create-extra.input';
import { UpdateExtraInput } from '../dto/update-extra.input';
import { InjectModel } from '@nestjs/mongoose';
import { Extra, ExtraDocument } from '../entities/extra.entity';
import { Model } from 'mongoose';
import { FilterExtraInput } from '../dto/filter-extra.input';

@Injectable()
export class ExtrasService {
  constructor(
    @InjectModel(Extra.name) private extraModel: Model<ExtraDocument>,
  ) {}

  async create(createExtraInput: CreateExtraInput) {
    const newExtra = await this.extraModel.create(createExtraInput);
    newExtra.save();
    return newExtra;
  }

  async findAll(filter: FilterExtraInput) {
    const extras = await this.extraModel.find(filter);

    return extras;
  }

  async findOne(id: string) {
    const extraFound = await this.extraModel.findById(id);

    if (!extraFound) {
      throw new BadRequestException(`User with id:${id} not found`);
    }
    return extraFound;
  }

  async update(id: string, updateExtraInput: UpdateExtraInput) {
    const extraFound = await this.findOne(id);
    console.log(updateExtraInput)
    await extraFound.updateOne({
      ...updateExtraInput,
    });

    return {
      ...extraFound.toJSON(),
      ...updateExtraInput,
    };
  }

  async remove(id: string) {
    const userFound = await this.findOne(id);
    const result = userFound.deleteOne();

    return result ? true : false;
  }
}
