import { IsNumber } from 'class-validator';

export class InviteUserDto {
  @IsNumber()
  readonly userId: number;
}
