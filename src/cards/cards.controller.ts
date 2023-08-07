import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCardDTO } from './DTO/create.DTO';
import { Card } from './card.entity';
import { UpdateCardDTO } from './DTO/update.DTO';
import { Response } from 'express';

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
    @Res() res: Response,
  ) {
    const result = await this.cardService.updateCard(body, id);
    if (result) {
      res.status(204).end();
    } else {
      res.status(400).json({
        message: '카드 업데이트 실패',
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Card' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({
    status: 204,
    description: 'No Content',
  })
  async deleteCard(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const result = await this.cardService.deleteCard(id);
    if (result) {
      res.status(204).end();
    } else {
      res.status(400).json({
        message: '카드 삭제 실패',
      });
    }
  }
}
