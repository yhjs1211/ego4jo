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
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCardDTO } from './DTO/create.DTO';
import { Card } from './card.entity';
import { UpdateCardDTO } from './DTO/update.DTO';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('cards')
@UseInterceptors(SuccessInterceptor)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get Card Detail' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'OK', type: Card })
  async getCardDetailById(
    @Query('id', ParseIntPipe) id: number,
  ): Promise<Card> {
    const result = await this.cardService.getCardDetailById(id); // cardId
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

  @Put('/:id')
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
    console.log(body);

    await this.cardService.updateCard(body, id);
    return;
  }

  @Delete('/:id')
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
