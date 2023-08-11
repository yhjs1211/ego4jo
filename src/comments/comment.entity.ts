import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/cards/card.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @ApiProperty({
    required: true,
    description: 'Auto-Increment filed by Comment id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true,
    description: 'Input your opinion for card',
  })
  @Column({
    type: 'text',
  })
  comment: string;

  @ManyToOne(() => Card, (card) => card.comments)
  @JoinColumn({ name: 'cardId' })
  card: Card;

  //   @ManyToOne(() => User, (user) => user.comments)
  //   user: User;
}
