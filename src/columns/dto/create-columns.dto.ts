import { PickType } from '@nestjs/mapped-types';
import { Columns } from '../columns.entity';

export class CreateColumnsDto extends PickType(Columns, [
  'title',
  'boardId',
  'columnNumber',
] as const) {}
