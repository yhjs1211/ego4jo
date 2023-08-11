import { Users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User_Board } from './user_board.entity';
import { Columns } from 'src/columns/columns.entity';

@Entity({ schema: 'trello', name: 'board' })
export class Board {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 100 })
  background: string;

  @Column('varchar', { length: 1000 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Users, (user) => user.boards)
  user: Users;

  @OneToMany(() => User_Board, (userBoard) => userBoard.board)
  userBoard: User_Board[];

  @OneToMany(() => Columns, (column) => column.board)
  columns: Columns[];
}
