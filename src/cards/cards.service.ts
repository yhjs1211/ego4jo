import { Injectable } from '@nestjs/common';
import { CardRepository } from './card.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardRepository: CardRepository) {}
}
