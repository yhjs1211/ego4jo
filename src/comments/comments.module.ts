import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentRepository } from './comment.repository';
import { CardRepository } from 'src/cards/card.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentRepository, CardRepository],
  exports: [CommentRepository],
})
export class CommentsModule {}
