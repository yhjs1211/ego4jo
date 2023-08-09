import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardRepository } from './card.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), CommentsModule],
  controllers: [CardsController],
  providers: [CardsService, CardRepository],
  exports: [CardRepository],
})
export class CardsModule {}
