import { Injectable } from '@nestjs/common';
import { Board } from './entity/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getBoards(id: number) {
    return await this.boardRepository.find({
      where: { id, deletedAt: null },
      select: ['id', 'title', 'background', 'createdAt', 'updatedAt'],
    });
  }
}
