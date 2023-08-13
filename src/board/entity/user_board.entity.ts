import { IsNumber } from 'class-validator';
import { Users } from 'src/users/users.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity({ schema: 'trello', name: 'user_board' })
export class User_Board {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  boardId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.userBoard, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @ManyToOne(() => Board, (board) => board.userBoard, {
    onDelete: 'CASCADE',
  })
  board: Board;
}
