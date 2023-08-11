import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDTO } from './DTO/create.DTO';
import { CardRepository } from 'src/cards/card.repository';
import { UpdateCommentDTO } from './DTO/update.DTO';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly cardRepository: CardRepository,
  ) {}

  async getAllCommentsByCardId(cardId: number) {
    return this.commentRepository.findAllByCard(cardId);
  }

  async createCommentByCardId(cardId: number, data: CreateCommentDTO) {
    return this.commentRepository.createComment(cardId, data);
  }

  updateCommentById(commentId: number, data: UpdateCommentDTO) {
    return this.commentRepository.updateCommentById(commentId, data);
  }

  deleteCommentById(commentId: number) {
    return this.commentRepository.deleteCommentById(commentId);
  }
}
