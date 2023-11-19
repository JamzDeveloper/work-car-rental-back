import { IsString } from 'class-validator';

export class CreateFaqInput {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}
