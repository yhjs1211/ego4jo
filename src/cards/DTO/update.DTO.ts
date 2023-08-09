import { PartialType } from '@nestjs/swagger';
import { CreateCardDTO } from './create.DTO';

export class UpdateCardDTO extends PartialType(CreateCardDTO) {}
