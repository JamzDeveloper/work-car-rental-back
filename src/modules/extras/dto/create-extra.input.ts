import { IsString } from 'class-validator';

export class CreateExtraInput {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
