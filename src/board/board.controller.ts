import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Users } from 'src/users/users.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InviteUserDto } from './dto/inviteUser-dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //보드 생성
  @Post()
  @UseGuards(JwtAuthGuard)
  async createBoard(
    @CurrentUser() user: Users,
    @Body() data: CreateBoardDto,
  ): Promise<any> {
    return await this.boardService.createBoard(user, data);
  }

  // 내가 생성한 보드 조회
  @Get('/createdBoards')
  @UseGuards(JwtAuthGuard)
  async getCreatedBoards(@CurrentUser() user: Users): Promise<any> {
    return await this.boardService.getCreatedBoards(user.id);
  }

  //보드 수정
  @Put('/:boardId')
  @UseGuards(JwtAuthGuard)
  async updateBoard(
    @Param('boardId') boardId: number,
    @CurrentUser() user: Users,
    @Body() data: UpdateBoardDto,
  ): Promise<any> {
    return await this.boardService.updateBoard(boardId, user.id, data);
  }

  // 보드 삭제
  @Delete('/:boardId')
  @UseGuards(JwtAuthGuard)
  async deleteBoard(
    @Param('boardId') boardId: number,
    @CurrentUser() user: Users,
  ) {
    return await this.boardService.deleteBoard(boardId, user.id);
  }

  // 보드에 사용자 초대
  @Post('/invite/:boardId')
  @UseGuards(JwtAuthGuard)
  async inviteUser(
    @Param('boardId') boardId: number,
    @Body() data: InviteUserDto,
  ) {
    return await this.boardService.inviteUser(boardId, data.userId);
  }

  // 내가 초대된 보드 조회
  @Get('invitedBoards')
  @UseGuards(JwtAuthGuard)
  async getInvitedBoards(@CurrentUser() user: Users): Promise<any> {
    return await this.boardService.getInvitedBoards(user.id);
  }
}
