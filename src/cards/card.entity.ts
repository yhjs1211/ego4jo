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
    required: false,
    description: 'Auto-Increment column by Card id',
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
    required: false,
    description: 'Please input what to do.',
  })
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty({
    required: false,
    description: 'This job will have to be finished before deadline.',
  })
  @Column({
    type: 'date',
  })
  deadline: string;

  @ApiProperty({
    required: false,
    description: 'Background color on card',
  })
  @Column({
    type: 'varchar',
    length: 30,
  })
  color: string;

  @ApiProperty({
    required: false,
    description: 'The number in Column will be given by Service Logic',
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
