import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';

@Injectable()
export class ColumnsService {
  constructor(private columnsRepository: ColumnsRepository) {}

  async getColumns() {
    return await this.columnsRepository.find({
      where: { deletedAt: null },
      select: ['id', 'title', 'boardId', 'columnNumber'],
    });
  }

  createColumns(title: string, boardId: number, columnNumber: number) {
    this.columnsRepository.insert({
      title,
      boardId,
      columnNumber,
    });
  }

  async updateColumns(
    id: number,
    title: string,
    boardId: number,
    columnNumber: number,
  ) {
    this.columnsRepository.update(id, { title, boardId, columnNumber });
  }

  async deleteColumns(id: number) {
    await this.columnsRepository.softDelete(id);
  }
}
