import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      '비밀번호는 8자리 이상, 영대문자, 소문자, 숫자를 반드시 포함해야 합니다.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
