import { Board } from 'src/board/entity/board.entity';
import { User_Board } from 'src/board/entity/user_board.entity';
import { Card } from 'src/cards/card.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToMany(() => Card, (card) => card.workers)
  @JoinTable({ name: 'users_cards' })
  cards: Card[];

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => User_Board, (userBoard) => userBoard.user)
  userBoard: User_Board[];
}
