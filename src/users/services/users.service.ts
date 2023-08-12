import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { UserSignUpDto } from '../dto/users.signUp.dto';
import { UserUpdateRequestDto } from '../dto/users.update.request.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UserSignUpDto) {
    const { email, password, confirm, name } = body;
    const isUserExist = await this.usersRepository.findUserByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('이미 존재하는 사용자 입니다.');
    }

    if (password !== confirm) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });

    return {
      statusCode: 201,
      message: '회원가입 성공',
    };
  }

  async updateUser(id: number, body: UserUpdateRequestDto) {
    const { password, newPassword, name } = body;
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자 입니다.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('password를 확인해주세요.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersRepository.updateUser(user, {
      password: hashedPassword,
      name,
    });

    return {
      statusCode: 201,
      message: '회원정보 수정 성공',
    };
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자 입니다.');
    }

    await this.usersRepository.deleteUser(id);

    return {
      statusCode: 201,
      message: '회원정보 삭제 성공',
    };
  }
}
