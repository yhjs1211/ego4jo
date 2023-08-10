import { PickType } from '@nestjs/swagger';
import { Card } from '../card.entity';

export class CreateCardDTO extends PickType(Card, [
  'title',
  'description',
  'deadline',
  'color',
  'cardNum',
  'columnId',
] as const) {}
