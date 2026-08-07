import { PartialType } from '@nestjs/swagger';
import { CreateFutbolistaDto } from './create-futbolista.dto';

export class UpdateFutbolistaDto extends PartialType(CreateFutbolistaDto) {}
