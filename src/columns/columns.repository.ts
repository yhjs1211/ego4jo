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
    await this.findAndCount({ where: { boardId: data.boardId } }).then(
      (data) => {
        this.merge(columns, { columnNumber: data[1] + 1 });
      },
    );

    const createdColumns = await this.save(columns);
    return createdColumns;
  }

  async updateColumns(id: number, data: UpdateColumnsDto) {
    const updatedCols = (await this.update({ id }, data)).affected;
    return updatedCols;
  }

  // async updateColumnNumber(
  //   min: number,
  //   max: number,
  //   newColumnNumber: number,
  //   column: Columns,
  //   columns: Columns[],
  // ) {
  //   return await this.dataSource.transaction(async (manager) => {
  //     if (column.columnNumber === min) {
  //       columns
  //         .filter((column) => {
  //           return column.columnNumber > min && column.columnNumber <= max;
  //         })
  //         .forEach(async (column) => {
  //           await manager.update(Columns, column, {
  //             columnNumber: column.columnNumber - 1,
  //           });
  //         });
  //       return (await manager.update(Columns, column, { columnNumber: max }))
  //         .affected;
  //     } else if (column.columnNumber === max) {
  //       columns
  //         .filter((column) => {
  //           return column.columnNumber <= max && column.columnNumber > min;
  //         })
  //         .forEach(async (column) => {
  //           await manager.update(Columns, column, {
  //             columnNumber: column.columnNumber + 1,
  //           });
  //         });
  //       return (await manager.update(Columns, column, { columnNumber: min }))
  //         .affected;
  //     }
  //   });
  // }
}
