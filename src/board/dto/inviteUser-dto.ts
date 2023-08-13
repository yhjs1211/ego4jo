import { IsString } from 'class-validator';

export class InviteUserDto {
  @IsString()
  readonly email: string;
}
