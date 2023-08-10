import { ApiProperty } from '@nestjs/swagger';
import { Columns } from 'src/columns/columns.entity';
import { Comment } from 'src/comments/comment.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
    nullable: true,
  })
  description: string;

  @ApiProperty({
    required: false,
    description: 'This job will have to be finished before deadline.',
  })
  @Column({
    type: 'date',
    nullable: true,
  })
  deadline: string;

  @ApiProperty({
    required: false,
    description: 'Background color on card',
  })
  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  color: string;

  @ApiProperty({
    required: false,
    description: 'The number in Column will be given by Service Logic',
  })
  @Column()
  cardNum: number;

  @Column()
  columnId: number;

  @ManyToOne(() => Columns, (column) => column.cards)
  @JoinColumn({ name: 'columnId', referencedColumnName: 'id' })
  column: Columns;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];

  // Bi-directional relations
  @ManyToMany(() => Users, (user) => user.cards)
  workers: Users[];
}
