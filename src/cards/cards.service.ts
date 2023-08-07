import { Injectable } from '@nestjs/common';
import { CardRepository } from './card.repository';
import { CreateCardDTO } from './DTO/create.DTO';

@Injectable()
export class CardsService {
  constructor(private readonly cardRepository: CardRepository) {}

  getCardDetailById(id: number) {
    return this.cardRepository.findOneById(id);
  }

  createCard(data: CreateCardDTO) {
    return this.cardRepository.createCard(data);
  }
}
