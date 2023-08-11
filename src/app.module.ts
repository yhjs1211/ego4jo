import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { ColumnsModule } from './columns/columns.module';
import { Users } from './users/users.entity';
import { Card } from './cards/card.entity';
import { Comment } from './comments/comment.entity';
import { Columns } from './columns/columns.entity';
import { Board } from './board/entity/board.entity';
import { BoardModule } from './board/board.module';
import { User_Board } from './board/entity/user_board.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Card, Comment, Columns, Board, User_Board],
      synchronize: true,
    }),
    UsersModule,
    CardsModule,
    CommentsModule,
    ColumnsModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
