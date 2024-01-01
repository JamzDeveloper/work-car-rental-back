import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

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
  price: number;


  @IsBoolean()
  availability: boolean
  
  @IsBoolean()
  published: boolean
  
  @IsString()
  brand: string

  @IsString()
  model: string

  @IsString()
  pickupTime: string

  @IsString()
  @IsOptional()
  image:string

  @IsString()
  @IsOptional()
  imageAws:string
}
