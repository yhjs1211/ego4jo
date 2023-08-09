import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
<<<<<<< HEAD
  exports: [],
=======
>>>>>>> 0107d3f692a3dae84c7c9b568b38cef727535e25
})
export class CommentsModule {}
