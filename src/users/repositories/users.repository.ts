import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users.entity';
import { Repository } from 'typeorm';
import { UserRequestDto } from '../dto/users.request.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findUserByEmail(email: string): Promise<Users | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async createUser(user: UserRequestDto): Promise<Users> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }
}
