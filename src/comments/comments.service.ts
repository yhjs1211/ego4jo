import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDTO } from './DTO/create.DTO';
import { UpdateCommentDTO } from './DTO/update.DTO';
import { Users } from 'src/users/users.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getAllCommentsByCardId(cardId: number) {
    return this.commentRepository.findAllByCard(cardId);
  }

  async createCommentByCardId(
    cardId: number,
    data: CreateCommentDTO,
    user: Users,
  ) {
    return this.commentRepository.createComment(cardId, data, user.id);
  }

  async updateCommentById(
    commentId: number,
    data: UpdateCommentDTO,
    user: Users,
  ) {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (comment.userId === user.id) {
      return this.commentRepository.updateCommentById(commentId, data);
    } else {
      throw new BadRequestException('Comment should be updated by writer');
    }
  }

  async deleteCommentById(commentId: number, user: Users) {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (comment.userId === user.id) {
      return this.commentRepository.deleteCommentById(commentId);
    } else {
      throw new BadRequestException('Comment should be deleted by writer');
    }
  }
}
