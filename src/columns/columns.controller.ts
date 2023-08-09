import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto } from './dto/create-columns.dto';
import { DeleteColumnsDto } from './dto/delete-columns.dto';
import { UpdateColumnsDto } from './dto/update-columns.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  async getColumns() {
    return await this.columnsService.getColumns();
  }

  @Post()
  createColumns(@Body() data: CreateColumnsDto) {
    return this.columnsService.createColumns(
      data.title,
      data.boardId,
      data.columnNumber,
    );
  }

  @Put('/:id')
  async upddateColumns(
    @Param('id') columnsId: number,
    @Body() data: UpdateColumnsDto,
  ) {
    return await this.columnsService.updateColumns(
      columnsId,
      data.title,
      data.boardId,
      data.columnNumber,
    );
  }

  @Delete('/:id')
  async deleteColumns(
    @Param('id') columnsId: number,
    @Body() data: DeleteColumnsDto,
  ) {
    return await this.columnsService.deleteColumns(columnsId);
  }
}
