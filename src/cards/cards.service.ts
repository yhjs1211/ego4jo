import { Injectable, NotFoundException } from '@nestjs/common';
import { CardRepository } from './card.repository';
import { CreateCardDTO } from './DTO/create.DTO';
import { UpdateCardDTO } from './DTO/update.DTO';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { Card } from './card.entity';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  getCardDetailById(id: number) {
    return this.cardRepository.findOneById(id);
  }

  createCard(data: CreateCardDTO) {
    return this.cardRepository.createCard(data);
  }

  async updateCard(data: UpdateCardDTO, id: number): Promise<number | Card> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: { workers: true },
    });

    if (card) {
      if (data.columnId && data.newCardNum) {
        // 순서 변경 요청시

        const min = Math.min(card.cardNum, data.newCardNum);
        const max = Math.max(card.cardNum, data.newCardNum);

        const cards = await this.cardRepository.find({
          where: { columnId: card.columnId },
        });
        if (card.columnId === data.columnId) {
          // 같은 컬럼 내 이동시
          this.cardRepository.updateCardNumber(
            min,
            max,
            data.newCardNum,
            card,
            cards,
            true,
          );
        } else {
          // 다른 컬럼에 이동시
          const diffCards = await this.cardRepository.find({
            where: { columnId: data.columnId },
          });
          return this.cardRepository.updateCardNumber(
            min,
            max,
            data.newCardNum,
            card,
            cards,
            false,
            diffCards,
            data.columnId,
          );
        }
      } else if (data.userEmail) {
        const user = await this.userRepository.findUserByEmail(data.userEmail);

        if (!user) throw new NotFoundException('Not found User by Email');

        card.workers.push(user);
        return this.cardRepository.addUserOnCard(card);
      } else {
        // 내부 데이터 변경 요청시
        return await this.cardRepository.updateCard(id, data);
      }
    } else {
      throw new NotFoundException(`Not found Card by ${id}`);
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
