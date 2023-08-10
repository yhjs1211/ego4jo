import { PickType } from '@nestjs/mapped-types';
import { Columns } from '../columns.entity';

export class DeleteColumnsDto extends PickType(Columns, ['id'] as const) {}
