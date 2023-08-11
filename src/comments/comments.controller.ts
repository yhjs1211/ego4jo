import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDTO } from './DTO/create.DTO';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UpdateCommentDTO } from './DTO/update.DTO';

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
  @ApiOperation({ summary: 'Create comment for card by id' })
  async createCommentByCardId(
    @Param('cardId', ParseIntPipe) id: number,
    @Body() body: CreateCommentDTO,
  ) {
    const result = await this.commentService.createCommentByCardId(id, body);
    return result;
  }

  @Put('/:commentId')
  @ApiOperation({ summary: 'Update Comment by Comment ID' })
  async updateCommentByCommentId(
    @Param('commentId', ParseIntPipe) id: number,
    @Body() body: UpdateCommentDTO,
  ) {
    const result = await this.commentService.updateCommentById(id, body);

    return result;
  }

  @Delete('/:commentId')
  @ApiOperation({ summary: 'Delete Comment by Comment ID' })
  async deleteCommentByCommentId(@Param('commentId', ParseIntPipe) id: number) {
    const result = await this.commentService.deleteCommentById(id);
    return result;
  }
}
