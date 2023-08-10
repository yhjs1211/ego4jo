import { Injectable } from '@nestjs/common';
import { Users } from '../users.entity';
import { DataSource, Repository } from 'typeorm';
import { UserCreateDto } from '../dto/users.create.dto';
import { UserUpdateDto } from '../dto/users.update.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private readonly dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findUserByEmail(email: string): Promise<Users | null> {
    const user = await this.findOne({ where: { email } });
    return user;
  }

  async createUser(user: UserCreateDto): Promise<Users> {
    const newUser = this.create(user);
    return await this.save(newUser);
  }

  async findUserById(id: number): Promise<Users | null> {
    const user = await this.findOne({
      where: { id, deletedAt: null },
      select: ['id', 'email', 'name', 'imgUrl'],
    });
    return user;
  }

  async updateUser(user: Users, data: UserUpdateDto): Promise<object> {
    const result = await this.update({ id: user.id }, data);
    return result;
  }

  async findByIdAndUpdateImage(id: number, fileName: string): Promise<string> {
    const user = await this.findOne({ where: { id } });
    user.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newUser = await this.save(user);
    return newUser.imgUrl;
  }

  async deleteUser(id: number): Promise<object> {
    const result = await this.delete({ id: id });
    return result;
  }
}
