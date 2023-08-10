import { Injectable } from '@nestjs/common';
import { Columns } from './columns.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateColumnsDto } from './dto/create-columns.dto';
import { UpdateColumnsDto } from './dto/update-columns.dto';

@Injectable()
export class ColumnsRepository extends Repository<Columns> {
  constructor(private dataSource: DataSource) {
    super(Columns, dataSource.createEntityManager());
  }

  async createColumns(data: CreateColumnsDto) {
    const columns = this.create(data);
    await this.findAndCount().then((data) => {
      this.merge(columns, { columnNumber: data[1] + 1 });
    });

    const createdColumns = await this.save(columns);
    return createdColumns;
  }

  async updateColumns(columns: Columns, data: UpdateColumnsDto) {
    const updatedColumns = await this.update({ id: columns.id }, data);
    return updatedColumns.affected;
  }
}
