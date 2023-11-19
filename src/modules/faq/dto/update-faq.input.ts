import { CreateFaqInput } from './create-faq.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFaqInput extends PartialType(CreateFaqInput) {}
