import { Injectable } from '@nestjs/common';
import { Card } from './card.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCardDTO } from './DTO/create.DTO';
import { UpdateCardDTO } from './DTO/update.DTO';

@Injectable()
export class CardRepository extends Repository<Card> {
  constructor(private readonly dataSource: DataSource) {
    super(Card, dataSource.createEntityManager());
  }

  async findOneById(id: number): Promise<Card | null> {
    const foundCard = await this.findOneBy({ id });
    return foundCard;
  }

  async createCard(data: CreateCardDTO): Promise<Card> {
    const card = this.create(data);
    await this.findAndCount().then((data) => {
      this.merge(card, { cardNum: data[1] + 1 });
    });

    const createdCard = await this.save(card);
    return createdCard;
  }

  async updateCard(card: Card, data: UpdateCardDTO): Promise<number> {
    const result = await this.cardRepository.update({ id: card.id }, data);

    return result.affected;
  }

  async deleteCard(id: number): Promise<number> {
    const result = await this.cardRepository.delete({ id });

    return result.affected;
  }
}
