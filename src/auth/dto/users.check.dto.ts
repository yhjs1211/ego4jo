import { IsNotEmpty, IsString } from 'class-validator';

export class UserCheckDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
