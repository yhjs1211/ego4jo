import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //보드 조회
  @Get('/boards')
  async getBoards() {
    return await this.boardService.getBoards();
  }
}
