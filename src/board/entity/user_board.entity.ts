import { IsNumber } from 'class-validator';
import { Users } from 'src/users/users.entity';
import { Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity({ schema: 'trello', name: 'user_board' })
export class User_Board {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  boardId: number;

  @ManyToOne(() => Users, (user) => user.userBoard)
  user: Users;

  @ManyToOne(() => Board, (board) => board.userBoard)
  board: Board;
}
