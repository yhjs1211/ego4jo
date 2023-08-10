import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersRepository } from './repositories/users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { AwsService } from 'src/aws.service';
import { ConfigModule } from '@nestjs/config';
import * as multer from 'multer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AwsService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
