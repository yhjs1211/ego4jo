import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnsDto } from './dto/create-columns.dto';
import { UpdateColumnsDto } from './dto/update-columns.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnsRepository: ColumnsRepository) {}

  async getColumns() {
    return await this.columnsRepository.find({
      where: { deletedAt: null },
      select: ['id', 'title', 'boardId', 'columnNumber'],
      relations: { cards: { comments: true } },
      order: { cards: { cardNum: 'asc' } },
    });
  }

  createColumns(data: CreateColumnsDto) {
    return this.columnsRepository.createColumns(data);
  }

  async updateColumns(id: number, data: UpdateColumnsDto) {
    const columns = await this.columnsRepository.findOneBy({ id });
    if (!columns) {
      throw new NotFoundException(`${id} as columsId didn't exist in Database`);
    }
    return await this.columnsRepository.updateColumns(columns, data);
  }

  async deleteColumns(id: number) {
    await this.columnsRepository.softDelete(id);
  }
}
