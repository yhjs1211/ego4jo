import { Users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => Users)
  user = Users;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  deletedAt: Date | null;
}
