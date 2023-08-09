import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../dto/users.create.dto';
import { UserUpdateDto } from '../dto/users.update.dto';

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

  async createUser(user: UserCreateDto): Promise<Users> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async findUserById(id: number): Promise<Users | null> {
    const user = await this.usersRepository.findOne({
      where: { id, deletedAt: null },
      select: ['id', 'email', 'name', 'imgUrl'],
    });
    return user;
  }

  async updateUser(user: Users, data: UserUpdateDto): Promise<object> {
    const result = await this.usersRepository.update({ id: user.id }, data);
    return result;
  }

  async findByIdAndUpdateImage(id: number, fileName: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newUser = await this.usersRepository.save(user);
    return newUser.imgUrl;
  }

  async deleteUser(id: number): Promise<object> {
    const result = await this.usersRepository.delete({ id: id });
    return result;
  }
}
