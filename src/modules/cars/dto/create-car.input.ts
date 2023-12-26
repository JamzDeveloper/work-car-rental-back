import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCarInput {
  @IsString()
  name: string;

  @IsNumber()
  countPerson: number;

  @IsString()
  typeChange: string;

  @IsNumber()
  minTankQuantity: number;

  @IsNumber()
  maxTankQuantity: number;

  @IsString()
  fullType: string;

  @IsString()
  subTitle: string;

  @IsString()
  description: string;

  @IsNumber()
  precio: number;
}
