import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnsDto } from './dto/create-columns.dto';
import { DeleteColumnsDto } from './dto/delete-columns.dto';
import { UpdateColumnsDto } from './dto/update-columns.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Columns' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getColumns() {
    return await this.columnsService.getColumns();
  }

  @Get('/:columnId')
  @ApiOperation({ summary: 'Get Column Detail By ID' })
  async getColumnsById(@Param('columnId', ParseIntPipe) id: number) {
    return await this.columnsService.getColumnDetailById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Column' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  createColumns(@Body() body: CreateColumnsDto) {
    const result = this.columnsService.createColumns(body);
    return result;
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update Column' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 201,
    description: 'Updated',
  })
  async upddateColumns(
    @Param('id') columnsId: number,
    @Body() body: UpdateColumnsDto,
  ) {
    const result = this.columnsService.updateColumns(columnsId, body);
    console.log(body);
    return result;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Column' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 201,
    description: 'Deleted',
  })
  async deleteColumns(
    @Param('id') columnsId: number,
    // @Body() data: DeleteColumnsDto,
  ) {
    return await this.columnsService.deleteColumns(columnsId);
  }
}
