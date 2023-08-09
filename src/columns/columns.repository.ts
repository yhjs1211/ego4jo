import { Injectable } from '@nestjs/common';
import { Columns } from './columns.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ColumnsRepository extends Repository<Columns> {
  constructor(private dataSource: DataSource) {
    super(Columns, dataSource.createEntityManager());
  }
}
