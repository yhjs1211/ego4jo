import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Board } from './entity/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  // 보드 생성
  async createBoard(user: Users, data: CreateBoardDto): Promise<any> {
    return await this.boardRepository.createBoard(user, data);
  }

  // 내가 생성한 보드 조회
  async getCreatedBoards(userId: number): Promise<any> {
    return await this.boardRepository.getCreatedBoards(userId);
  }

  // 보드 수정
  async updateBoard(
    boardId: number,
    userId: number,
    data: UpdateBoardDto,
  ): Promise<any> {
    const board = await this.boardRepository.getBoard(boardId);

    if (!board) {
      throw new NotFoundException('보드를 찾을 수 없습니다.');
    }

    if (board.user.id !== userId) {
      throw new UnauthorizedException('보드를 수정할 권한이 없습니다.');
    }

    return await this.boardRepository.updateBoard(boardId, userId, data);
  }

  // 보드 삭제
  async deleteBoard(boardId: number, userId: number): Promise<any> {
    const board = await this.boardRepository.getBoard(boardId);

    if (!board) {
      throw new NotFoundException('보드를 찾을 수 없습니다.');
    }

    if (board.user.id !== userId) {
      throw new UnauthorizedException('보드를 삭제할 권한이 없습니다.');
    }

    return await this.boardRepository.deleteBoard(boardId, userId);
  }

  // 보드에 사용자 초대
  async inviteUser(boardId: number, email: string): Promise<any> {
    return await this.boardRepository.inviteUser(boardId, email);
  }

  // 내가 초대된 보드 조회
  async getInvitedBoards(userId: number): Promise<any> {
    return await this.boardRepository.getInvitedBoards(userId);
  }

  // 보드 상세 정보 조회
  async getBoardDetail(id: number) {
    return await this.boardRepository.find({
      where: { id, deletedAt: null },
      select: ['id', 'title'],
      relations: { columns: { cards: true } },
      order: { columns: { columnNumber: 'asc' } },
    });
  }
}
