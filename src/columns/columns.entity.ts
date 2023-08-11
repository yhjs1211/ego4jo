import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/cards/card.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Board } from 'src/board/entity/board.entity';

@Entity()
export class Columns {
  @ApiProperty({
    required: false,
    description: 'Auto-Increment column by Columns id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true,
    description: 'This is Columns_title.',
  })
  @Column()
  title: string;

  @ApiProperty({
    required: false,
    description: 'The number in Column will be given by Service Logic',
  })
  @Column()
  columnNumber: number;

  @Column()
  boardId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Card, (card) => card.column, { nullable: true })
  cards: Card[];

  @ManyToOne(() => Board, (board) => board.columns)
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  board: Board;
}
