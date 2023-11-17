import { CreateExtraInput } from './create-extra.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateExtraInput extends PartialType(CreateExtraInput) {
  id: number;
}
