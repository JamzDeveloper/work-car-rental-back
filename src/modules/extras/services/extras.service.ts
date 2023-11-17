import { Injectable } from '@nestjs/common';
import { CreateExtraInput } from '../dto/create-extra.input';
import { UpdateExtraInput } from '../dto/update-extra.input';

@Injectable()
export class ExtrasService {
  create(createExtraInput: CreateExtraInput) {
    return 'This action adds a new extra';
  }

  findAll() {
    return `This action returns all extras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} extra`;
  }

  update(id: number, updateExtraInput: UpdateExtraInput) {
    return `This action updates a #${id} extra`;
  }

  remove(id: number) {
    return `This action removes a #${id} extra`;
  }
}
