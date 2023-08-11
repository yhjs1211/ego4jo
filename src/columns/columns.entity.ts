import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
// import { Card } from 'src/cards/card.entity';
// import { Board } from 'src/board/board.entity';

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
    description: 'This is boardId connected by Columns',
  })
  @Column()
  boardId: number;

  @ApiProperty({
    required: false,
    description: 'The number in Column will be given by Service Logic',
  })
  @Column()
  columnNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // @OneToMany(() => Card, (card) => card.column)
  // cards: Card[];

  // @ManyToOne(()=> Broad, (board)=> board.columns)
  // board: Board;
}
