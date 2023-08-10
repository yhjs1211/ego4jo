import { PickType } from '@nestjs/swagger';
import { Comment } from '../comment.entity';

export class CreateCommentDTO extends PickType(Comment, ['comment'] as const) {}
