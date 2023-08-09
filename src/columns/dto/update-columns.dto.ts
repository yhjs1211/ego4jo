import { PartialType } from '@nestjs/mapped-types';
import { CreateColumnsDto } from './create-columns.dto';

export class UpdateColumnsDto extends PartialType(CreateColumnsDto) {}
