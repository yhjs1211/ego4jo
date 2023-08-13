import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/cards/card.entity';
import { Users } from 'src/users/users.entity';
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

  @Column()
  cardId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Card, (card) => card.comments)
  @JoinColumn({ name: 'cardId', referencedColumnName: 'id' })
  card: Card;

  @ManyToOne(() => Users, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: Users;
}
