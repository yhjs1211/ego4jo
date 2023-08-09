import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCardDTO } from './DTO/create.DTO';
import { Card } from './card.entity';
import { UpdateCardDTO } from './DTO/update.DTO';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get Card Detail' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'OK', type: Card })
  async getCardDetailById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Card> {
    const result = await this.cardService.getCardDetailById(id);
    if (!result) throw new NotFoundException('There is no Card in Database');

    return result;
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Card' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: Card,
  })
  async createCard(@Body() body: CreateCardDTO): Promise<Card> {
    const result = await this.cardService.createCard(body);

    return result;
  }

  @Put(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update Card' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({
    status: 204,
    description: 'No Content',
  })
  async updateCard(
    @Body() body: UpdateCardDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.cardService.updateCard(body, id);
    return;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete Card' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({
    status: 204,
    description: 'No Content',
  })
  async deleteCard(@Param('id', ParseIntPipe) id: number) {
    await this.cardService.deleteCard(id);
    return;
  }
}
