import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/comment.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card {
  @ApiProperty({
    required: true,
    description: 'Auto-Increment filed by Card id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true,
    description: 'This title is to be shown for user.',
  })
  @Column()
  title: string;

  @ApiProperty({
    required: true,
    description: 'Please input what to do.',
  })
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty({
    required: true,
    description: 'This job will be finished before deadline.',
  })
  @Column({
    type: 'date',
  })
  deadline: string;

  @ApiProperty({
    required: true,
    description: 'Background color on card',
  })
  @Column({
    type: 'varchar',
    length: 30,
  })
  color: string;

  @ApiProperty({
    required: true,
    description: 'The number in Column',
  })
  @Column()
  cardNum: number;

  // @ManyToOne(() => Column, (column) => column.cards)
  // column: Column

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];

  // Bi-directional relations
  // @ManyToMany(()=> User, (user) => user.cards)
  // workers: User[]
}
