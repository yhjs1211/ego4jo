import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { BoardRepository } from './board.repository';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { User_Board } from './entity/user_board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User_Board]), UsersModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
