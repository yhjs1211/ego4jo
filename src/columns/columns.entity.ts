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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  boardId: number;

  @Column()
  columnNumber: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // @OneToMany(() => Card, (card) => card.columns, { nullable: true })
  // card: Card[];

  // @ManyToOne(()=> Broad, (board)=> board.columns, { onDelete: 'SET NULL'})
  // board: Board;
}
