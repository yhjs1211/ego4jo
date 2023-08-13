import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDTO } from './DTO/create.DTO';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UpdateCommentDTO } from './DTO/update.DTO';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Users } from 'src/users/users.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@ApiTags('comments')
@UseInterceptors(SuccessInterceptor)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get('/:cardId')
  @ApiOperation({ summary: 'Find all comments by Card ID' })
  @ApiResponse({ status: 200, description: 'All Comments as array' })
  @ApiResponse({ status: 404, description: 'Not Found Comments by Card ID' })
  async getAllCommentsByCardId(@Param('cardId', ParseIntPipe) id: number) {
    const result = await this.commentService.getAllCommentsByCardId(id);
    return result;
  }

  @Post('/:cardId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create comment for card by id' })
  async createCommentByCardId(
    @Param('cardId', ParseIntPipe) id: number,
    @CurrentUser() user: Users,
    @Body() body: CreateCommentDTO,
  ) {
    const result = await this.commentService.createCommentByCardId(
      id,
      body,
      user,
    );
    return result;
  }

  @Put('/:commentId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Comment by Comment ID' })
  async updateCommentByCommentId(
    @Param('commentId', ParseIntPipe) id: number,
    @CurrentUser() user: Users,
    @Body() body: UpdateCommentDTO,
  ) {
    const result = await this.commentService.updateCommentById(id, body, user);

    return result;
  }

  @Delete('/:commentId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Comment by Comment ID' })
  async deleteCommentByCommentId(
    @Param('commentId', ParseIntPipe) id: number,
    @CurrentUser() user: Users,
  ) {
    const result = await this.commentService.deleteCommentById(id, user);
    return result;
  }
}
