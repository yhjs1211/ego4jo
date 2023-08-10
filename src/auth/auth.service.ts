import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UserCheckDto } from './dto/users.check.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('email 또는 password를 확인해주세요.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('email 또는 password를 확인해주세요.');
    }

    const payload = { id: user.id, email: email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async userCheck(id: number, data: UserCheckDto) {
    const { password } = data;

    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new UnauthorizedException('email 또는 password를 확인해주세요.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('email 또는 password를 확인해주세요.');
    }

    return {
      message: '사용자 확인 완료',
    };
  }
}
