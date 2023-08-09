import { Injectable, NotFoundException } from '@nestjs/common';
import { CardRepository } from './card.repository';
import { CreateCardDTO } from './DTO/create.DTO';
import { UpdateCardDTO } from './DTO/update.DTO';

@Injectable()
export class CardsService {
  constructor(private readonly cardRepository: CardRepository) {}

  getCardDetailById(id: number) {
    return this.cardRepository.findOneById(id);
  }

  createCard(data: CreateCardDTO) {
    return this.cardRepository.createCard(data);
  }

  async updateCard(data: UpdateCardDTO, id: number): Promise<number> {
    const card = await this.cardRepository.findOneById(id);
    if (card) {
      return await this.cardRepository.updateCard(card, data);
    } else {
      throw new NotFoundException(`${id} as cardId didn't exist in Database`);
    }
  }

  async deleteCard(id: number): Promise<number> {
    const card = await this.cardRepository.findOneById(id);
    if (card) {
      return await this.cardRepository.deleteCard(card.id);
    } else {
      throw new NotFoundException(`${id} as cardId didn't exist in Database`);
    }
  }
}
