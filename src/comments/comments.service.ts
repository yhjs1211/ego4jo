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
    const card = await this.cardRepository.findOneById(cardId);
    if (card) {
      return this.commentRepository.findAllByCard(card);
    } else {
      throw new NotFoundException('There is no Card in DB');
    }
  }

  async createCommentByCardId(cardId: number, data: CreateCommentDTO) {
    const card = await this.cardRepository.findOneById(cardId);
    if (card) {
      return this.commentRepository.createComment(card, data);
    } else {
      throw new NotFoundException('There is no Card in DB');
    }
  }

  updateCommentById(commentId: number, data: UpdateCommentDTO) {
    return this.commentRepository.updateCommentById(commentId, data);
  }

  deleteCommentById(commentId: number) {
    return this.commentRepository.deleteCommentById(commentId);
  }
}
