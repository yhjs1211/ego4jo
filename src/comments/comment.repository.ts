import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Injectable } from '@nestjs/common';
import { CreateCommentDTO } from './DTO/create.DTO';
import { Card } from 'src/cards/card.entity';
import { UpdateCommentDTO } from './DTO/update.DTO';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  async findAllByCard(cardId: number) {
    const comments = await this.find({ where: { cardId } });
    return comments;
  }

  async createComment(cardId: number, data: CreateCommentDTO, userId: number) {
    const comment = this.create(data);
    this.merge(comment, { cardId, userId });

    await this.save(comment);
    return comment;
  }

  async updateCommentById(id: number, data: UpdateCommentDTO) {
    await this.update({ id }, data);

    return await this.findBy({ id });
  }

  async deleteCommentById(id: number) {
    const deleted = await this.delete({ id });

    return deleted.affected;
  }
}
