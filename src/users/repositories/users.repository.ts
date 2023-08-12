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

  async findUserByIdWithoutPassword(id: number): Promise<Users | null> {
    const user = await this.findOne({
      where: { id, deletedAt: null },
      select: ['id', 'email', 'name', 'imgUrl'],
    });
    return user;
  }

  async findUserById(id: number): Promise<Users | null> {
    const user = await this.findOne({
      where: { id, deletedAt: null },
    });
    return user;
  }

  async updateUser(user: Users, data: Partial<UserUpdateDto>): Promise<object> {
    const result = await this.update({ id: user.id }, data);
    return result;
  }

  async findByIdAndUpdateImage(id: number, key: string): Promise<string> {
    const user = await this.findOne({ where: { id } });
    user.imgUrl = key;
    const newUser = await this.save(user);
    return newUser.imgUrl;
  }

  async getUserImageUrl(id: number): Promise<string> {
    const user = await this.findOne({ where: { id } });
    return user.imgUrl;
  }

  async deleteUser(id: number): Promise<object> {
    const result = await this.delete({ id: id });
    return result;
  }
}
