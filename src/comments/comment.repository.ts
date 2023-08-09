import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }
}
