import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateFaqInput } from '../dto/create-faq.input';
import { UpdateFaqInput } from '../dto/update-faq.input';
import { InjectModel } from '@nestjs/mongoose';
import { Faq, FaqDocument } from '../entities/faq.entity';
import { Model } from 'mongoose';

@Injectable()
export class FaqService {
  constructor(@InjectModel(Faq.name) private faqModel: Model<FaqDocument>) {}

  async create(createFaqInput: CreateFaqInput) {
    const newFaq = await this.faqModel.create(createFaqInput);
    newFaq.save();
    return newFaq;
  }

  async findAll() {
    return await this.faqModel.find();
  }

  async findOne(id: string) {
    const faqFound = await this.faqModel.findById(id);
    if (!faqFound) {
      throw new BadRequestException(`FAQ with id:${id} does not exist`);
    }
    return faqFound;
  }

  async update(id: string, updateFaqInput: UpdateFaqInput) {
    const faqFound = await this.findOne(id);
    await faqFound.updateOne({
      ...updateFaqInput,
    });
    return {
      ...faqFound.toJSON(),
      ...updateFaqInput,
    };
  }

  async remove(id: string) {
    const faqFound = await this.findOne(id);
    const result = await faqFound.deleteOne();

    return result ? true : false;
  }
}
