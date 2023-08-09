import { PickType } from '@nestjs/mapped-types';
import { CreateColumnsDto } from './create-columns.dto';

export class DeleteColumnsDto extends PickType(CreateColumnsDto, [
  'boardId',
] as const) {}
