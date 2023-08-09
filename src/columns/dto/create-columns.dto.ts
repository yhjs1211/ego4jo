import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  boardId: number;

  @IsNumber()
  columnNumber: number;
}
