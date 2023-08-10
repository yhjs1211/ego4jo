import { PartialType } from '@nestjs/swagger';
import { Comment } from '../comment.entity';

export class UpdateCommentDTO extends PartialType(Comment) {}
