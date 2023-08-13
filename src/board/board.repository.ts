import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './entity/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Users } from 'src/users/users.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Board } from './entity/user_board.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersRepository: UsersRepository,
    @InjectRepository(User_Board)
    private userBoardRepository: Repository<User_Board>,
  ) {
    super(Board, dataSource.createEntityManager());
  }

  //보드 생성
  async createBoard(user: Users, data: CreateBoardDto): Promise<any> {
    return await this.insert({
      title: data.title,
      // background: data.background,
      description: data.description,
      user,
    });
  }

  // 보드 조회
  async getBoard(boardId: number): Promise<any> {
    // return await this.findOne({
    //   where: { id: boardId, deletedAt: null },
    // });
    const query = this.createQueryBuilder('board')
      .select([
        'board.id',
        'board.title',
        // 'board.background',
        'board.description',
        'board.createdAt',
        'board.updatedAt',
        'user.id',
      ])
      .where('board.id = :boardId', { boardId })
      .innerJoin('board.user', 'user');

    const board = await query.getOne();

    return board;
  }

  // 내가 생성한 보드 조회
  async getCreatedBoards(userId: number): Promise<any> {
    const query = this.createQueryBuilder('board');

    query
      .select([
        'board.id',
        'board.title',
        // 'board.background',
        'board.description',
        'board.createdAt',
        'board.updatedAt',
      ])
      .where('board.userId = :userId AND board.deletedAt IS NULL', { userId })
      .orderBy('board.createdAt', 'DESC');

    const boards = await query.getMany();

    return boards;
  }

  //보드 수정
  async updateBoard(
    boardId: number,
    userId: number,
    data: UpdateBoardDto,
  ): Promise<any> {
    return await this.update(boardId, data);
  }

  // 보드 삭제
  async deleteBoard(boardId: number, userId: number): Promise<any> {
    return await this.softDelete({ id: boardId });
  }

  // 보드에 사용자 초대
  async inviteUser(boardId: number, email: string): Promise<any> {
    const user = await this.usersRepository.findUserByEmail(email);
    return await this.userBoardRepository.insert({
      userId: user.id,
      boardId,
    });
  }

  // 내가 초대된 보드 조회
  async getInvitedBoards(userId: number): Promise<any> {
    const board = await this.userBoardRepository.find({
      where: { userId },
      relations: { board: true },
    });
    return board;
  }
}
