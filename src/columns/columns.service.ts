import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnsDto } from './dto/create-columns.dto';
import { UpdateColumnsDto } from './dto/update-columns.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnsRepository: ColumnsRepository) {}

  async getColumns() {
    return await this.columnsRepository.find({
      where: { deletedAt: null },
      select: ['id', 'title', 'columnNumber'],
      relations: { cards: { comments: true } },
      order: { cards: { cardNum: 'asc' } },
    });
  }

  createColumns(data: CreateColumnsDto) {
    return this.columnsRepository.createColumns(data);
  }

  async updateColumns(id: number, data: UpdateColumnsDto) {
    const column = await this.columnsRepository.findOneBy({ id });
    // if (data.boardId && column) {
    //   const min = Math.min(column.columnNumber, data.newColumnNumber);
    //   const max = Math.max(column.columnNumber, data.newColumnNumber);
    //   const columns = await this.columnsRepository.find({
    //     where: { boardId: column.boardId },
    //   });
    //   this.columnsRepository.updateColumnNumber(
    //     min,
    //     max,
    //     data.newColumnNumber,
    //     column,
    //     columns,
    //   );
    // } else {
    return await this.columnsRepository.updateColumns(id, data);
    // }
  }

  async deleteColumns(id: number) {
    await this.columnsRepository.softDelete(id);
  }
}
