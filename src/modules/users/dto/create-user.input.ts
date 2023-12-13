import { IsEmail, IsString } from 'class-validator';

export class CreateUserInput {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;


}
