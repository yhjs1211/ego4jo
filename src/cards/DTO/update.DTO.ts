import { PartialType } from '@nestjs/swagger';
import { Card } from '../card.entity';

export class UpdateCardDTO extends PartialType(Card) {}
