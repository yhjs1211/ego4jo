import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnsRepository } from './columns.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from './columns.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Columns])],
  controllers: [ColumnsController],
  providers: [ColumnsService, ColumnsRepository],
  exports: [ColumnsRepository],
})
export class ColumnsModule {}
