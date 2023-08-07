import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { CreateCardDTO } from './DTO/create.DTO';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async findOneById(id: number): Promise<Card | null> {
    const foundCard = await this.cardRepository.findOneBy({ id });
    return foundCard;
  }

  async createCard(data: CreateCardDTO): Promise<Card> {
    const card = this.cardRepository.create(data);
    await this.cardRepository.findAndCount().then((data) => {
      console.log(data);

      this.cardRepository.merge(card, { cardNum: data[1] + 1 });
    });

    const createdCard = await this.cardRepository.save(card);
    return createdCard;
  }
}
