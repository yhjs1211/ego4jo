import { IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  readonly title: string;

  // @IsString()
  // readonly background: string;

  @IsString()
  readonly description: string;
}
